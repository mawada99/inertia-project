import React from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  useTheme
} from "@mui/material";
import { useController } from "react-hook-form";
import { validation } from "../CustomFunctions/validation";
import PropTypes from "prop-types";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enLocale from "date-fns/locale/en-AU";
import { useTranslation } from "react-i18next";
import ar from "date-fns/locale/ar-EG";

const MUIDateTime = (props) => {
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
    readOnly,
    ...restprops
  } = props;
  const theme = useTheme();
  const {
    formState: { errors },
    field: { ref, value: val, onChange: fieldChange, ...fieldProps },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: defaultValue ?? value,
  });
  const { i18n } = useTranslation();
  const localeMap = {
    ar: ar,
    en: enLocale,
  };
  const locale = localeMap[i18n.language] || enLocale;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <FormControl variant="filled" fullWidth size="small">
        <DateTimePicker
          {...restprops}
          label={label}
          value={value}
          // inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            fieldChange(newValue);
            onChange && onChange(newValue);
          }}
          disabled={disabled}
          disableMaskedInput={true}
          ampm={true}
          renderInput={(props) => (
            <TextField
              {...props}
              size="small"
              variant={variant ?? "filled"}
              helperText={null}
              inputProps={{
                ...props.inputProps,
                readOnly: readOnly ?? true,
                dir: theme.direction,
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

MUIDateTime.propTypes = {
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

export default MUIDateTime;
