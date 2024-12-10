import {
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlagImage } from "react-international-phone";
import PropTypes from "prop-types";
import countries from "../../../phoneNumber.json";
import { styled } from "@mui/material/styles";
import EmptyTableMessage from "../FunctionComponents/EmptyTableMessage";
import { ArrowDropDown } from "@mui/icons-material";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-root": { paddingLeft: "6px", paddingRight: "8px" },
  ".MuiInputBase-input": { paddingRight: "2px" },
}));

const PREFIX = "MuiPhone";

const classes = {
  countryContent: `${PREFIX}-countryContent`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
  position: "relative",

  [`& .${classes.countryContent}`]: {
    cursor: "pointer",
  },
}));

const MuiPhone = (props) => {
  const {
    name,
    control,
    defaultValue,
    readOnly,
    inputProps,
    rules,
    onChange,
    variant,
    serverValidation,
    label,
    selectName,
    mobileData,
    countryCodeValue,
    settingPhoneKey,
    setValue,
    codeValue,
    disabledCode,
    ...restProps
  } = props;

  const { t } = useTranslation();

  const {
    formState: { errors },
    field: { ref, onChange: fieldChange, value, ...fieldProps },
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

  const phoneNumberRegex = /^\d+$/;

  return (
    <TextFieldStyle
      inputRef={ref}
      type="tel"
      dir="ltr"
      {...fieldProps}
      {...restProps}
      label={isRequired ? label + " *" : label}
      defaultValue={defaultValue}
      value={value}
      autoComplete="off"
      id={name}
      variant={variant || "filled"}
      fullWidth
      multiline={!!props.rows}
      error={Boolean(fieldError || serverValidation?.[serverError])}
      helperText={
        errors
          ? fieldError?.message
          : Boolean(serverValidation) && serverValidation?.[serverError]
          ? serverValidation?.[serverError][0]
          : null
      }
      inputProps={{
        readOnly: readOnly,
        maxLength: 15,
        ...inputProps,
      }}
      onChange={(e) => {
        let value = e.target.value;
        const valid = phoneNumberRegex.test(value);
        const empty = value === "";
        if (!valid && !empty) {
          return;
        }
        fieldChange(e);
        onChange && onChange(e);
      }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ margin: 0 }}>
            {/* <MUIselect {...props} TextFieldChange={fieldChange} /> */}
            <CountriesCodeComponent
              {...props}
              setValue={setValue}
              codeValue={codeValue}
              disabled={disabledCode}
              TextFieldChange={fieldChange}
            />
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};

export const CountriesCodeComponent = (props) => {
  const {
    countryCodeValue,
    settingPhoneKey,
    selectName,
    codeValue,
    setValue,
    setting,
    disabled,
  } = props;
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState(null);
  const [countriesAllowed, setCountriesAllowed] = useState(countries);

  const name = selectName;

  const countryCode = "+20" ?? countryCodeValue;
  countriesAllowed.sort(function (a, b) {
    return i18n.language === "ar"
      ? a.labelAr.localeCompare(b.labelAr, ["ar"])
      : a.label.localeCompare(b.label, ["en"]);
  });
  const allowPhoneKey = true ?? settingPhoneKey;
  useEffect(() => {
    if (codeValue) {
      const valueAsNumber = codeValue.includes("+") ? true : false;
      const countryFound = valueAsNumber
        ? countries.filter(
            (country) => country.phone === codeValue.substring(1)
          )
        : countries.filter(
            (country) => country.code === codeValue.toUpperCase()
          );

      setCountry(countryFound[0]);
      if (setting) {
        setValue(name, countryFound[0].phone);
      } else {
        setValue(name, countryFound[0].code);
      }
    } else {
      const countryFound = countries.filter(
        (country) => country.phone === countryCode?.substring(1)
      );
      !setting && setValue(name, countryFound?.[0]?.code);
      setCountry(countryFound?.[0]);
    }

    // const code = getValues()[name]
    // console.log(code);
    // const countryFound = !setting && code ?
    //     countries.filter((country) => setting ? country.phone === code.substring(1) : country.code === code.toUpperCase())
    //     : countries.filter((country) => "+" + country.phone === countryCode)
    // setting ? setValue(name, countryFound[0].phone) : setValue(name, countryFound[0].code)
    // setCountry(countryFound[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, codeValue]);

  const replacements = [
    {
      char: "ا",
      alternatives: ["أ", "إ"],
    },
    {
      char: "ه",
      alternatives: ["ة"],
    },
    {
      char: "ي",
      alternatives: ["ى"],
    },
  ];

  const sanitize = (token) => {
    replacements.forEach((replacement) =>
      replacement.alternatives.forEach(
        (alternative) => (token = token.replace(alternative, replacement.char))
      )
    );

    return token;
  };

  const handleClose = () => {
    setCountriesAllowed(countries);
    handleClick();
  };

  function handleSetCountries(filteredList) {
    if (filteredList) {
      setCountriesAllowed(filteredList);
    } else {
      setCountriesAllowed(countries);
    }
  }

  const handleChangeFilter = (filter) => {
    if (!filter) {
      setCountriesAllowed(countries);
      return;
    }

    filter = filter.replace("+", "");
    const filteredList = countries.filter(
      (country) =>
        country.phone.includes(filter) ||
        (i18n.language === "ar"
          ? sanitize(country.labelAr).includes(sanitize(filter))
          : country.label.includes(filter))
    );

    handleSetCountries(filteredList);

    // else {
    //     if (i18n.language === "ar") {
    //         const filteredList = countries.filter(item => item.labelAr.includes(filter));
    //         handleSetCountries(filteredList)
    //     } else {
    //         const filteredList = countries.filter(item => item.label.toLowerCase().includes(filter.toLowerCase()));
    //         handleSetCountries(filteredList)
    //     }
    // }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const id = open ? "simple-popper" : undefined;
  const dir = i18n.language === "ku" ? "rtl" : i18n.dir();

  return (
    <Root>
      {open && (
        <ClickAwayListener onClickAway={handleClick}>
          <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 1500 }}>
            <Paper>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 400,
                  minWidth: 300,
                  "& ul": { padding: 0 },
                  ...(dir === "rtl" && { direction: "ltr" }),
                }}
                subheader={<li />}
              >
                <li>
                  <ul>
                    <ListSubheader sx={{ p: 2 }}>
                      <Stack>
                        <TextField
                          fullWidth
                          label={t("search")}
                          size="small"
                          onChange={(e) => handleChangeFilter(e.target.value)}
                          autoComplete="off"
                          inputRef={(input) => input && input.focus()}
                          disabled={disabled}
                        />
                      </Stack>
                    </ListSubheader>

                    {countriesAllowed.length ? (
                      countriesAllowed.map((country, index) => (
                        <ListItem key={index} component="div" disablePadding>
                          <ListItemButton
                            disabled={disabled}
                            onClick={() => {
                              if (setting) {
                                setValue(name, `+${country.phone}`);
                              } else {
                                setValue(name, country.code);
                              }
                              setCountry(country);
                              handleClose();
                            }}
                            sx={{ py: 1 }}
                          >
                            <Stack direction={"row"} alignItems={"center"}>
                              <FlagImage
                                iso2={
                                  country.code === "IL"
                                    ? "ps"
                                    : country.code.toLowerCase()
                                }
                                style={{ marginRight: "8px" }}
                                height={16}
                              />
                              <Typography mx="8px">
                                {i18n.language === "ar"
                                  ? country.labelAr
                                  : country.label}
                              </Typography>
                              <Typography color="gray">
                                +{country.phone}
                              </Typography>
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <EmptyTableMessage
                        loading={false}
                        message={t("noResult")}
                      />
                    )}
                  </ul>
                </li>
              </List>
            </Paper>
          </Popper>
        </ClickAwayListener>
      )}
      {allowPhoneKey && !setting && (
        <Stack
          aria-describedby={id}
          direction={"row"}
          pt={"18px"}
          onClick={disabled ? undefined : handleClick}
          className={classes.countryContent}
        >
          <Stack width={20}>
            <FlagImage
              iso2={country?.code === "IL" ? "ps" : country?.code.toLowerCase()}
              style={{ display: "flex", width: "100%" }}
              height={20}
            />
          </Stack>
          <Typography mx={1} color={"text.primary"}>
            +{country?.phone}
          </Typography>
        </Stack>
      )}

      {setting && (
        <Stack
          aria-describedby={id}
          border={(theme) => `1px solid ${theme.palette.divider}`}
          p={1.5}
          borderRadius={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
          onClick={handleClick}
          className={classes.countryContent}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Stack width={20}>
              <FlagImage
                iso2={
                  country?.code === "IL" ? "ps" : country?.code?.toLowerCase()
                }
                style={{ display: "flex", width: "100%" }}
                height={20}
              />
            </Stack>
            <Typography color={"text.primary"}>
              {i18n.language === "ar" ? country?.labelAr : country?.label}
            </Typography>
            <Typography
              color={"text.primary"}
              sx={{ direction: dir === "rtl" ? "rtl" : "ltr" }}
            >
              +{country?.phone}
            </Typography>
          </Stack>
          <ArrowDropDown />
        </Stack>
      )}
    </Root>
  );
};

MuiPhone.propTypes = {
  errors: PropTypes.any,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  selectName: PropTypes.string.isRequired,
};

export default MuiPhone;
