import React, { useEffect, useState } from "react";
import { FormControlLabel, Switch, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const MuiSwitch = (props) => {
  const { control, name, label, onChange, ...restProps } = props;

  const {
    formState: { errors },
    field: { onChange: checkboxChange, value },
  } = useController({
    name,
    control,
    defaultValue: false,

  });
  const errorName = name.includes(".") && name.split(".");
  const fieldError = errorName
    ? errors?.[errorName[0]]?.[errorName[1]]
    : errors?.[name];

  const [checkState, setCheckState] = useState(value);
  useEffect(() => {
    setCheckState(value);
    return () => { };
  }, [value]);
  return (
    <FormControl component="fieldset" variant="standard">
      <FormControlLabel
        checked={checkState}
        control={<Switch color="primary" />}
        label={<Typography variant="body2" color={"text.primary"}>{label}</Typography>}
        labelPlacement="end"
        onChange={(event) => {
          setCheckState(event.target.checked);
          checkboxChange(event.target.checked);
          onChange && onChange(event);
        }}
        {...restProps}
      />
      {
        errorName && <FormHelperText sx={{ color: (theme => theme.palette.error.main) }}>{fieldError?.message}</FormHelperText>
      }
    </FormControl>
  );
};

MuiSwitch.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default MuiSwitch;
