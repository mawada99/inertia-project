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
import { CloseRounded } from "@mui/icons-material";
// import { LIST_ENUM_DROPDOWN } from "../../../GlobalsQuery/ListDropdown/ListDropdown";
const EnumDropdown = (props) => {
  const {
    control,
    name,
    disabled,
    margin,
    label,
    onChanges,
    rules,
    readOnly,
    variant,
    skip,
    onCompleted,
    variables
  } = props;

  // const { data } = useQuery(
  //   gql` 
  //     ${LIST_ENUM_DROPDOWN.query} 
  //   `,
  //   {
  //     fetchPolicy: "network-only",
  //     skip: Boolean(skip),
  //     variables,
  //     ...(onCompleted && { onCompleted: onCompleted }),
  //   }
  // );





  const theme = useTheme();
  const dir = theme.direction;
  const {
    formState: { errors },
    field: { ref, value: val, onChange: fieldChange, ...fieldProps },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: '',
  });

  const errorName = name.includes(".") && name.split(".");
  const fieldError = errorName
    ? errors?.[errorName[0]]?.[errorName[1]]
    : errors?.[name];
  const isRequired = (rules && rules?.required) || (rules && typeof rules?.validate?.max() === "string");

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
          ...(val &&
          {
            IconComponent: ({ className }) => {
              className = className.replace("MuiSelect-iconOpen", "")
              return <IconButton
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
            }
          }
          ),
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
        }}
      >
        {/* {data && data?.__type?.enumValues?.map((items) => (
          <MenuItem key={items.name} value={items.name} dir={dir}>
            {items.name}
          </MenuItem>
        ))} */}
      </Select>

      {fieldError?.message && (
        <FormHelperText error>{fieldError?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

EnumDropdown.propTypes = {
  control: PropTypes.any.isRequired,
  errors: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChanges: PropTypes.func,
  rules: PropTypes.object,
  readOnly: PropTypes.bool,
  margin: PropTypes.string,
  onCompleted: PropTypes.func,
  variables: PropTypes.object,
  skip: PropTypes.bool,
};

export default memo(EnumDropdown);