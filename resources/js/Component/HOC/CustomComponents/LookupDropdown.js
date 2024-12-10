import React, { memo } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  useTheme,
  IconButton,
} from "@mui/material";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";
import { LIST_LOOKUP_ENTRIES_DROPDOWN } from "../../../GlobalsQuery/ListDropdown/ListDropdown";
import { CloseRounded } from "@mui/icons-material";

const LookupDropdown = (props) => {
  const {
    control,
    name,
    disabled,
    margin,
    label,
    onChanges,
    rules,
    readOnly,
    filters,
    onCompleted,
    variables,
    skip,
    variant,
    onChangeValue,
  } = props;
  const { data: queryData } = useQuery(
    gql`
      ${LIST_LOOKUP_ENTRIES_DROPDOWN.query}
    `,
    {
      nextFetchPolicy: "no-cache",
      fetchPolicy: "no-cache",
      skip: Boolean(skip),
      variables,
      ...(onCompleted && { onCompleted: onCompleted }),
    }
  );
  const data = () => {
    if (filters) {
      return filters[0] === "all"
        ? queryData?.listLookupEntriesDropdown?.map((i) => {
            const element = {
              key: i.name,
              value: i.code,
            };
            return element;
          })
        : queryData?.listLookupEntriesDropdown
            ?.map((i) => {
              let element;
              if (filters.some((ele) => ele === i.code)) {
                element = {
                  key: i.name,
                  value: i.code,
                };
              }
              return element;
            })
            .filter((i) => i !== undefined);
    } else {
      return queryData?.listLookupEntriesDropdown?.map((i) => {
        const element = {
          key: i.name,
          value: i.code,
        };
        return element;
      });
    }
  };
  const theme = useTheme();
  const dir = theme.direction;
  const {
    formState: { errors },
    field: { ref, value: val, onChange: fieldChange, ...fieldProps },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  const errorName = name.includes(".") && name.split(".");
  const fieldError = errorName
    ? errors?.[errorName[0]]?.[errorName[1]]
    : errors?.[name];
  const isRequired =
    (rules && rules?.required) ||
    (rules && typeof rules?.validate?.max() === "string");

  return (
    <FormControl
      margin={margin}
      variant={variant ?? "filled"}
      fullWidth
      size="small"
    >
      <InputLabel id={name}>{isRequired ? label + " *" : label}</InputLabel>

      <Select
        variant="filled"
        size="small"
        {...fieldProps}
        inputProps={{
          readOnly: readOnly,
          ...(val && {
            IconComponent: ({ className }) => {
              className = className.replace("MuiSelect-iconOpen", "");
              return (
                <IconButton
                  disabled={disabled}
                  onMouseDown={(event) => {
                    // stops the popup from appearing when this button is clicked
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    fieldChange("");
                  }}
                >
                  <CloseRounded />
                </IconButton>
              );
            },
          }),
          ...props.inputProps,
        }}
        label={label}
        inputRef={ref}
        error={Boolean(fieldError)}
        value={val}
        disabled={disabled}
        onChange={(e) => {
          fieldChange(e.target.value);
          onChanges && onChanges(e);
          onChangeValue && onChangeValue(data());
        }}
      >
        {data()?.map((items) => (
          <MenuItem key={items.value} value={items.value} dir={dir}>
            {items.key}
          </MenuItem>
        ))}
      </Select>

      {fieldError?.message && (
        <FormHelperText error>{fieldError?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

LookupDropdown.propTypes = {
  control: PropTypes.any.isRequired,
  errors: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChanges: PropTypes.func,
  rules: PropTypes.object,
  readOnly: PropTypes.bool,
  margin: PropTypes.string,
  filters: PropTypes.array,
  onCompleted: PropTypes.func,
  variables: PropTypes.object,
  skip: PropTypes.bool,
};

export default memo(LookupDropdown);
