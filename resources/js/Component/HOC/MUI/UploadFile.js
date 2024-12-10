import React from "react";
import { Icon, IconButton, InputAdornment, styled } from "@mui/material";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import ControlMUItextField from "./ControlMUItextField";

const Input = styled("input")({
  display: "none",
});

const UploadFile = (props) => {
  const {
    name,
    control,
    defaultValue,
    onChange,
    icon,
    accept,
    setValue,
    iconDisable,
    ...restProps
  } = props;

  const {
    formState: { errors },
    field: { onChange: fieldChange, value, ...fieldProps },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ?? "",
  });

  const handelChangeShipment = (e) => {
    e.target.files?.item(0)?.name &&
      setValue("fileName", e.target.files.item(0).name, {
        shouldValidate: true,
      });
  };
  return (
    <ControlMUItextField
      errors={errors}
      control={control}
      name="fileName"
      readOnly
      {...restProps}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <label htmlFor="icon-button-file">
              <Input
                {...fieldProps}
                disabled={iconDisable}
                value={value.filename}
                onChange={(e) => {
                  if (e.target.files.item(0)?.name) {
                    fieldChange(e.target.files);
                    handelChangeShipment(e);
                  }
                  onChange && onChange(e);
                }}
                onClick={(event) => {
                  if (!value) {
                    event.target.value = null;
                  }
                }}
                accept={accept}
                id="icon-button-file"
                type="file"
              />
              <IconButton disabled={iconDisable} color="default" aria-label="upload" component="span" size="large">
                <Icon>{icon}</Icon>
              </IconButton>
            </label>
          </InputAdornment>
        ),
      }}
    />
  );
};

UploadFile.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
};

export default UploadFile;
