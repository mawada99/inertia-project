import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ControlMUItextField = (props) => {
    const {
        name,
        control,
        defaultValue,
        readOnly,
        InputProps,
        inputProps,
        rules,
        onChange,
        variant,
        size,
        serverValidation,
        label,
        ...restProps
    } = props;

    const { t } = useTranslation();

    const {
        formState: { errors },
        field: { ref, onChange: fieldChange, ...fieldProps },
    } = useController({
        name,
        control,
        rules: {
            ...rules,
            ...(rules && {
                validate: {
                    whiteSpace: (value) => {
                        if (value && typeof value === "string") {
                            return !!value.trim() || t("fieldIsRequired");
                        }
                    },
                    ...(rules["validate"] && rules["validate"]),
                },
            }),
        },
        defaultValue: defaultValue ?? "",
    });

    const errorName = name.includes(".") && name.split(".");
    const serverError = errorName ? errorName[1] : name;
    const fieldError = errorName
        ? errors?.[errorName[0]]?.[errorName[1]]
        : errors?.[name];
    const isRequired =
        (rules && rules?.required) ||
        (rules?.validate?.max && typeof rules?.validate?.max() === "string") ||
        (rules?.validate?.require &&
            typeof rules?.validate?.require() === "string");

    return (
        <TextField
            inputRef={ref}
            {...fieldProps}
            {...restProps}
            label={isRequired ? label + " *" : label}
            defaultValue={defaultValue}
            autoComplete="off"
            id={name}
            variant={variant || "filled"}
            fullWidth
            multiline={!!props.rows}
            error={Boolean(fieldError || serverValidation?.[serverError])}
            helperText={
                errors
                    ? fieldError?.message
                    : Boolean(serverValidation) &&
                      serverValidation?.[serverError]
                    ? serverValidation?.[serverError][0]
                    : null
            }
            InputProps={InputProps}
            inputProps={{
                readOnly: readOnly,
                ...inputProps,
            }}
            onChange={(e) => {
                fieldChange(e);
                onChange && onChange(e);
            }}
            size={size ?? "small"}
        />
        
    );
};

ControlMUItextField.propTypes = {
    errors: PropTypes.any,
    name: PropTypes.string.isRequired,
    control: PropTypes.any.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
};

export default ControlMUItextField;
