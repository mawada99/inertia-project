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
import { gql, useQuery } from "@apollo/client";

const SelectWithQuery = (props) => {
  const {
    control,
    name,
    disabled,
    margin,
    label,
    onChanges,
    rules,
    readOnly,
    query,
    parseData,
    onCompleted,
    variables,
    skip,
  } = props;
  const { data: queryData } = useQuery(
    gql`
      ${query}
    `,
    {
      nextFetchPolicy: "no-cache",
      fetchPolicy: "no-cache",
      skip: Boolean(skip),
      variables,
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
    }
  );
  const data = parseData(queryData);
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
  const isRequired = rules && rules?.required;
  return (
    <FormControl margin={margin} variant="filled" fullWidth size="small">
      <InputLabel id={name}>{label}</InputLabel>

      <Select
        variant="standard"
        {...fieldProps}
        inputProps={{
          readOnly: readOnly,
        }}
        label={isRequired ? label + " *" : label}
        inputRef={ref}
        error={Boolean(fieldError)}
        value={val}
        disabled={disabled}
        onChange={(e) => {
          fieldChange(e.target.value);
          onChanges && onChanges(e);
        }}
      >
        <MenuItem value="">
          <br />
        </MenuItem>
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

SelectWithQuery.propTypes = {
  control: PropTypes.any,
  errors: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChanges: PropTypes.func,
  rules: PropTypes.object,
  readOnly: PropTypes.bool,
  margin: PropTypes.string,
  query: PropTypes.string,
  model: PropTypes.any,
  onCompleted: PropTypes.func,
  variables: PropTypes.object,
  skip: PropTypes.bool,
};

export default memo(SelectWithQuery);
