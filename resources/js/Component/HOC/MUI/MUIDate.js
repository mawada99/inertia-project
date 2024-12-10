import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { validation } from "../CustomFunctions/validation";
import PropTypes from "prop-types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const MUIDate = (props) => {
  const {
    control,
    disabled,
    name,
    label,
    rules,
    defaultValue,
    variant,
    onChange,
    value,
    InputProps,
    disablePastDates,
    ...restProps
  } = props;

  const {
    formState: { errors },
    field: { ref, value: val, onChange: fieldChange, ...fieldProps },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: defaultValue ?? new Date(),
  });

  // Function to disable past dates except the current value if it's in the past
  const shouldDisableDate = (date) => {
    if (disablePastDates) {
      const today = new Date();
      today.getDay(0, 0, 0, 0); // Normalize today's time to midnight

      if (value) {
        const selectedDate = new Date(value);
        selectedDate.getDay(0, 0, 0, 0); // Normalize selected date's time to midnight
        if (date.getTime() === selectedDate.getTime()) {
          return false; // Don't disable the currently selected date
        }
      }

      return date.getTime() < today.getTime();
    } else {
      return false;
    } // Disable past dates
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl variant="filled" fullWidth size="small">
        <DatePicker
          {...restProps}
          label={Boolean(rules?.required) ? label + "*" : label}
          value={value}
          inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            fieldChange(newValue);
            onChange && onChange(newValue);
          }}
          shouldDisableDate={shouldDisableDate} // Apply the disable logic
          disabled={disabled}
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              variant={variant ?? "filled"}
              helperText={null}
              InputProps={{
                ...props.InputProps,
                ...(props?.InputProps?.endAdornment && {
                  endAdornment: {
                    ...props?.InputProps?.endAdornment,
                    props: {
                      ...props?.InputProps?.endAdornment.props,
                      children: [
                        props?.InputProps?.endAdornment,
                        InputProps?.endAdornment,
                      ],
                    },
                  },
                }),
              }}
              inputProps={{
                ...props.inputProps,
                readOnly: true,
              }}
              {...fieldProps}
            />
          )}
        />
        {errors[name] && (
          <FormHelperText error>{validation(errors, "", name)}</FormHelperText>
        )}
      </FormControl>
    </LocalizationProvider>
  );
};

MUIDate.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.any,
  variant: PropTypes.string,
  onChange: PropTypes.func,
};

export default MUIDate;
