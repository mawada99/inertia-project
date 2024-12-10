import React from "react";
import { TextField } from "@mui/material";
// import { formHookRegister } from "../CustomFunctions/formHookRegister";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
let reg = null;

const MUItextField = (props) => {
    const {
        errors,
        register,
        onClick,
        name,
        label,
        size,
        fieldRef,
        defaultValue,
        onBlur,
        readOnly,
        type,
        rows,
        InputProps,
        inputProps,
        margin,
        formType,
        formVal,
        onChange,
        variant,
        disabled,
        serverValidation,
        watch,
        ...restProps
    } = props;
    const { t } = useTranslation();
    // const formRegister = formHookRegister(t("fieldIsRequired"));

    if (register) {
        const {
            ref,
            onChange: regOnChang,
            ...fieldProps
        } = register(name, {
            // ...formRegister(
            //     formType ? formType : undefined,
            //     formVal ? formVal : undefined
            // ),
        });
        reg = { ref: ref, regOnChang: regOnChang, fieldProps: fieldProps };
    }

    const errorName = name.includes(".") && name.split(".");
    const serverError = errorName ? errorName[1] : name;
    const fieldError = errorName
        ? errors?.[errorName[0]]?.[errorName[1]]
        : errors?.[name];
    return (
        <TextField
            {...restProps}
            name={name}
            {...reg?.fieldProps}
            inputRef={register && reg?.ref}
            autoComplete="off"
            InputProps={InputProps}
            id={name}
            label={label}
            variant={variant || "filled"}
            fullWidth
            type={type}
            defaultValue={defaultValue ? defaultValue : null}
            rows={rows}
            ref={fieldRef}
            multiline={!!rows}
            error={Boolean(fieldError || serverValidation?.[serverError])}
            helperText={
                errors
                    ? fieldError?.message
                    : Boolean(serverValidation) &&
                      serverValidation?.[serverError]
                    ? serverValidation?.[serverError][0]
                    : null
            }
            inputProps={{
                readOnly: readOnly,
                ...inputProps,
            }}
            margin={margin}
            onChange={(e) => {
                reg && reg.regOnChang(e);
                onChange && onChange(e);
            }}
            onClick={onClick}
            disabled={disabled}
            size={size ?? "small"}
            onBlur={(e) => {
                onBlur && onBlur();
            }}
            onKeyDown={(e) => {
                if (e.key === " " && watch === "") {
                    e.preventDefault();
                }
            }}
        />
    );
};

MUItextField.propTypes = {
    errors: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    fieldRef: PropTypes.any,
};

export default MUItextField;
