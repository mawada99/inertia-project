import React, { memo, useEffect } from "react";
import {
  CircularProgress,
  FormControl,
  TextField,
  styled,
  Icon,
  Paper,
  Box,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";
import { matchSorter } from "match-sorter";
import { useState } from "react";

let onChangeTimer;
let onCloseTimer;

const Code = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginRight: theme.spacing(0.5),
}));

export const Basic = memo((props) => {
  const {
    control,
    name,
    disabled,
    label,
    onChangeValue,
    rules,
    onFocus,
    defaultValue,
    setSkipQuery,
    data,
    queryName,
    loading,
    async,
    variant,
    filterName,
    multiple,
    valueKey,
    limitTags,
    allowSelectAll,
    setHeight,
    hideCode,
    showCode,
    getOptionDisabled,

    ...restProps
  } = props;
  const optionName = (option) =>
    filterName ? option[filterName] : option.name;

  const VK = valueKey ?? "id";
  const [value, setValue] = React.useState([]);
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
    control,
    rules: rules ? rules : null,
    defaultValue: "",
  });

  useEffect(() => {
    if (fValue === "") {
      setInputValue("");
      setValue([]);
    }
    return () => {};
  }, [fValue]);

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setValue(defaultValue);

      const defaultIds = defaultValue?.map((i) => i[VK]);
      fieldChange(defaultIds);
    } else {
      fieldChange("");
      setValue([]);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  //////// Query ////////
  const options = data ?? [];
  ////////////////////// Autocomplete Functions ////////////////////////////////
  const onChange = (e, data, reason) => {
    if (reason === "clear") {
      onChangeValue && onChangeValue("");
      fieldChange("");
      setSelectAll(false);
    } else {
      onChangeValue && onChangeValue(data);
      let value = [];
      data.forEach((i) => (value = [...value, i[VK]]));

      fieldChange(value);
    }
    if (reason === "clear" || reason === "removeOption") setSelectAll(false);
    if (reason === "selectOption" && value.length === data.length)
      setSelectAll(true);

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
    async && setSkipQuery(true);
  }; //////// Query ////////

  const onOpen = () => {
    async ? setSkipQuery(false) : options.length === 0 && setSkipQuery(false);
  }; //////// Query ////////

  const getOptionLabel = (option) => {
    return (typeof option === "string" ? option : optionName(option)) ?? "";
  }; //////// Basic ////////

  const getOptionSelected = (option, value) => option[VK] === value[VK]; //////// Basic ////////

  const renderOption = (props, option, params) => (
    <div {...props} key={props.id}>
      {/* <Code>{option[VK]}</Code> */}
      {!hideCode && <Code>{showCode ? option.code : option[VK]}</Code>}
      {!hideCode && <span style={{ padding: "0 5px" }}> {"|"} </span>}
      <span>{optionName(option)}</span>
    </div>
  ); //////// Basic ////////

  const filterOptions = (options, state) => {
    const filterd = options?.filter(
      (i) => !value.some((ele) => ele[VK] === i[VK])
    ); //////// Basic ////////
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

  const [selectAll, setSelectAll] = useState(false);

  const handleToggleSelectAll = () => {
    setSelectAll((prev) => {
      if (!prev) {
        onChangeValue && onChangeValue(data);
        let value = [];
        data.forEach((i) => (value = [...value, i[VK]]));
        fieldChange(value);
        setValue(data);
      } else setValue([]);
      return !prev;
    });
  };
  const isRequired = rules && rules?.required;
  //
  return (
    <FormControl variant={variant ?? "filled"} fullWidth size="small">
      <Autocomplete
        {...fieldProps}
        multiple={multiple}
        filterSelectedOptions
        limitTags={limitTags ?? 1}
        options={Boolean(options) ? options : []}
        disabled={disabled}
        id={name}
        getOptionDisabled={getOptionDisabled}
        ListboxProps={{ style: { maxHeight: setHeight ?? "auto" } }}
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
            size="small"
            helperText={fieldError && fieldError.message}
          />
        )}
        PaperComponent={(paperProps) => {
          const { children, ...restPaperProps } = paperProps;
          return allowSelectAll ? (
            <Paper {...restPaperProps} sx={{ overflow: "auto" }}>
              <Box
                onMouseDown={(e) => e.preventDefault()} // prevent blur
                pl={1.5}
                py={0.5}
              >
                <FormControlLabel
                  onClick={(e) => {
                    e.preventDefault(); // prevent blur
                    handleToggleSelectAll();
                  }}
                  label={allowSelectAll}
                  control={
                    <Checkbox id="select-all-checkbox" checked={selectAll} />
                  }
                />
              </Box>
              <Divider />
              {children}
            </Paper>
          ) : (
            <Paper {...restPaperProps}>{children}</Paper>
          );
        }}
      />
    </FormControl>
  );
});

export const MultipleAutocomplete = memo((props) => {
  const {
    query,
    skip,
    variables,
    onCompleted,
    async,
    parseData,
    defaultValue,
    updateValues,
    ...restProps
  } = props;

  const [skipQuery, setSkipQuery] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [defaultValues, setDefaultValues] = React.useState([]);

  const { data: queryData, loading } = useQuery(
    gql`
      ${query}
    `,
    {
      nextFetchPolicy: "cache-and-network",
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      skip: skipQuery || Boolean(skip),
      variables: {
        ...(!async && variables && { ...variables }),
        ...(async && { ...variables(inputValue) }),
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
        const queryName = Object.keys(data)?.[0];
        let defValue = [];
        data[queryName].forEach((i) => {
          if (defaultValue?.some((value) => value === i[props.valueKey])) {
            defValue.push(i);
          }
        });
        setDefaultValues(defValue);
      },
    }
  );

  useEffect(() => {
    if (updateValues?.length > 0 && queryData) {
      let defValue = [];
      const queryName = Object.keys(queryData)?.[0];
      queryData[queryName].forEach((i) => {
        if (updateValues?.some((value) => value === i[props.valueKey])) {
          defValue.push(i);
        }
      });
      setDefaultValues(defValue);
    } else {
      setDefaultValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateValues]);

  const queryName = queryData && Object.keys(queryData)?.[0];
  const data = parseData(queryData?.[queryName]);

  return (
    <Basic
      {...restProps}
      defaultValue={defaultValues}
      setSkipQuery={(skip) => setSkipQuery(skip)}
      data={data}
      queryName={(name) => setInputValue(name)}
      loading={loading}
      async={async}
    />
  );
});
MultipleAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  parseData: PropTypes.func.isRequired,
  skip: PropTypes.bool,
  variables: PropTypes.any,
  onCompleted: PropTypes.func,
  sync: PropTypes.bool,
  defaultValue: PropTypes.array,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  rules: PropTypes.object,
  getOptionDisabled: PropTypes.func,
};
