import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  IconButton
  // useTheme
} from "@mui/material";
import { useController } from "react-hook-form";
import { validation } from "../CustomFunctions/validation";
import PropTypes from "prop-types";
import { Clear } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const MUIDateCustom = (props) => {
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
    resetDate,
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
  const [dateRangeState, setDateRangeState] = useState(false);
  const handleOpenDateRange = (e) => {
    setDateRangeState(true);
  };

  const handleCloseDateRange = () => {
    setDateRangeState(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl variant="filled" fullWidth size="small">
        <DatePicker
          {...restProps}
          label={label}
          value={value}
          inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            fieldChange(newValue);
            onChange && onChange(newValue);
          }}
          closeOnSelect={false}
          open={dateRangeState}
          onClose={handleCloseDateRange}
          onOpen={handleOpenDateRange}
          disabled={disabled}
          disableHighlightToday
          disableOpenPicker
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              variant={variant ?? "filled"}
              onClick={handleOpenDateRange}
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

                ...(resetDate && value && {
                  endAdornment: (
                    <IconButton
                      size="small"
                      key={"startDate"}
                      onClick={(e) => {
                        e.stopPropagation();
                        resetDate(e);
                      }}
                    >
                      <Clear size="small" />
                    </IconButton>
                  ),
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

MUIDateCustom.propTypes = {
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

export default MUIDateCustom;
