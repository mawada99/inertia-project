import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  FormControl,
  Icon,
  styled,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { matchSorter } from "match-sorter";
import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

let onChangeTimer;
let onCloseTimer;

const Code = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginRight: theme.spacing(0.5),
}));

export const AutocompleteWithJson = memo((props) => {
  const {
    control,
    name,
    disabled,
    label,
    onChangeValue,
    rules,
    onFocus,
    defaultValue,
    // setSkipQuery,
    data,
    queryName,
    loading,
    async,
    variant,
    size,
    filterName,
    InputProps,
    valueKey,
    hideCode,
    selectFirstValue,
    onCompleted,
    changeData,
    ...restProps
  } = props;

  useEffect(() => {
    onCompleted && onCompleted(data);
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionName = (option) =>
    filterName ? option[filterName] : option.name;

  const VK = valueKey ?? "id";

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    return () => {
      clearTimeout(onChangeTimer);
      clearTimeout(onCloseTimer);
    };
  }, []);

  const { t } = useTranslation();

  const {
    formState: { errors },
    field: { onChange: fieldChange, value: fValue, ...fieldProps },
  } = useController({
    name,
    control: control,
    rules: rules ? rules : null,
    defaultValue: "",
  });

  useEffect(() => {
    if (fValue === "") {
      setInputValue("");
      setValue(null);
    }
    return () => { };
  }, [fValue]);

  useEffect(() => {
    if (defaultValue) {
      const fieldValue = defaultValue?.[VK] || defaultValue?.[VK] === 0;
      setValue(fieldValue ? defaultValue : null);
      setInputValue(
        filterName ? defaultValue[filterName] : defaultValue?.name ?? ""
      );
      fieldChange(fieldValue ? defaultValue?.[VK] : "");
    } else {
      fieldChange("")
      setValue(null);
    }
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  useEffect(() => {
    if (selectFirstValue) {
      const fieldValue = selectFirstValue?.[VK] || selectFirstValue?.[VK] === 0;
      setValue(fieldValue ? selectFirstValue : null);
      setInputValue(
        filterName ? selectFirstValue[filterName] : selectFirstValue?.name ?? ""
      );
      fieldChange(fieldValue ? selectFirstValue?.[VK] : "");
    }
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFirstValue]);

  //////// Query ////////
  const options = Object.assign([], data);
  data && value && options.unshift(value);

  ////////////////////// Autocomplete Functions ////////////////////////////////
  const onChange = (e, data, reason) => {
    if (reason === "clear") {
      onChangeValue && onChangeValue("");
      fieldChange("");
    } else {
      onChangeValue && onChangeValue(data);
      VK !== "id" ? fieldChange(data?.[VK]) : fieldChange(parseInt(data?.[VK]));
    }
    setValue(data);
  }; //////// Basic ////////

  const onInputChange = (event, newInputValue, reason) => {
    setInputValue(newInputValue);
    clearTimeout(onChangeTimer);
    onChangeTimer = setTimeout(() => {
      queryName && queryName(newInputValue);
    }, 500);
  }; //////// Basic ////////

  const onClose = (e, reason) => {
    clearTimeout(onCloseTimer);
    onCloseTimer = setTimeout(() => {
      queryName && queryName("");
    }, 501);
    // async && setSkipQuery(true);
  }; //////// Query ////////

  const onOpen = () => {
    // async ? setSkipQuery(false) : options.length === 0 && setSkipQuery(false);
  }; //////// Query ////////

  const getOptionLabel = (option) => {
    return typeof option === "string" ? option : optionName(option);
  }; //////// Basic ////////

  const getOptionSelected = (option, value) => option[VK] === value[VK]; //////// Basic ////////

  const renderOption = (props, option, params) => (
    <div {...props} key={option[VK]}>
      {!hideCode && <Code>{option?.code}</Code>}
      <span> </span>
      <span>{optionName(option)}</span>
    </div>
  ); //////// Basic ////////

  const filterOptions = (options, state) => {
    const filterd = options?.filter((i) => i[VK] !== fValue); //////// Basic ////////
    const inputValue = state.inputValue;

    const client = matchSorter(filterd, inputValue, {
      keys: [(option) => optionName(option), "code"],
      baseSort: () => 0,
    });
    return async ? filterd : client;
  };

  const errorName = name.includes(".") && name.split(".");

  const fieldError = errorName
    ? errors?.[errorName[0]]?.[errorName[1]]
    : errors?.[name];
  const isRequired =
    (rules && rules?.required) ||
    (rules && typeof rules?.validate?.max() === "string");

  return (
    <FormControl variant={variant ?? "filled"} fullWidth size="small">
      <Autocomplete
        {...fieldProps}
        options={Boolean(options) ? options : []}
        disabled={disabled}
        id={name}
        loading={loading && loading}
        loadingText={t("loading")}
        filterOptions={filterOptions}
        renderOption={renderOption}
        isOptionEqualToValue={getOptionSelected}
        getOptionLabel={getOptionLabel}
        inputValue={inputValue}
        value={value}
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}

        onInputChange={onInputChange}
        popupIcon={
          <React.Fragment>
            <Icon>arrow_drop_down</Icon>
            {loading && loading && (
              <CircularProgress color="inherit" size={20} />
            )}
          </React.Fragment>
        }
        renderInput={(params) => (
          <TextField
            {...restProps}
            onFocus={onFocus}
            error={Boolean(fieldError)}
            {...params}
            label={isRequired ? label + " *" : label}
            variant={variant ?? "filled"}
            size={size ?? "small"}
            InputProps={{
              ...params.InputProps,
              ...InputProps,
            }}
            helperText={fieldError && fieldError.message}
          />
        )}
      />
    </FormControl>
  );
});

export const CustomAutocomplete = memo((props) => {
  const {
    query,
    skip,
    variables,
    onCompleted,
    async,
    parseData,
    defaultValue,
    selectFirst,
    refetchQuery,
    updateValue,
    ...restProps
  } = props;

  // const [skipQuery, setSkipQuery] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const { data: queryData, loading } = useQuery(
    gql`
      ${query}
    `,
    {
      // nextFetchPolicy: "no-cache",
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      skip: Boolean(skip),
      partialRefetch: Boolean(refetchQuery),
      variables: {
        ...(!async && variables && { ...variables }),
        ...(async && { ...variables(inputValue) }),
        // ...(async && { name: inputValue }),
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
    }
  );

  const queryName = queryData && Object.keys(queryData)?.[0];
  const data = parseData(queryData?.[queryName]);

  const selectFirstValue = data?.[0];

  return (
    <AutocompleteWithJson
      {...restProps}
      defaultValue={typeof defaultValue === 'object' ? defaultValue : data?.find(e => e.id === defaultValue)}
      selectFirstValue={selectFirst && !defaultValue && selectFirstValue}
      // setSkipQuery={(skip) => setSkipQuery(skip)}
      data={data}
      queryName={(name) => setInputValue(name)}
      loading={loading}
      async={async}
    />
  );
});

CustomAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  parseData: PropTypes.func.isRequired,
  skip: PropTypes.bool,
  refetchQuery: PropTypes.bool,
  variables: PropTypes.any,
  onCompleted: PropTypes.func,
  sync: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  rules: PropTypes.object,
};
