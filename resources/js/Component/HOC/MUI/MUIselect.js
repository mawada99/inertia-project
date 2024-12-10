import React, { memo } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const MUIselect = (props) => {
  const {
    control,
    data,
    name,
    disabled,
    margin,
    label,
    onChanges,
    rules,
    readOnly,
    defaultValue,
  } = props;
  const theme = useTheme();
  const dir = theme.direction;
  const {
    formState: { errors },
    field: { ref, value: val, onChange: fieldChange, ...fieldProps },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: data && defaultValue ? defaultValue : "",
  });

  const errorName = name.includes(".") && name.split(".");
  const fieldError = errorName
    ? errors?.[errorName[0]]?.[errorName[1]]
    : errors?.[name];
  const isRequired = (rules && rules?.required) || (rules && rules?.validate);
  return (
    <FormControl margin={margin} variant="filled" fullWidth size="small">
      <InputLabel id={name}>{isRequired ? label + " *" : label}</InputLabel>

      <Select
        // variant="standard"
        {...fieldProps}
        inputProps={{
          readOnly: readOnly,
        }}
        label={label}
        inputRef={ref}
        error={Boolean(fieldError)}
        value={val}
        defaultValue={data && defaultValue ? defaultValue : ""}
        defaultChecked
        disabled={disabled}
        onChange={(e) => {
          fieldChange(e.target.value);
          onChanges && onChanges(e);
        }}
      >
        {data && (
          <MenuItem value="">
            <br />
          </MenuItem>
        )}
        {data?.map((items, index) => (
          <MenuItem key={index} value={items.value} dir={dir}>
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

MUIselect.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
  data: PropTypes.array,
  name: PropTypes.string,
  label: PropTypes.string,
  onChanges: PropTypes.func,
  rules: PropTypes.object,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
};

export default memo(MUIselect);
