import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import arLocale from "date-fns/locale/ar";
import enLocale from "date-fns/locale/en-AU";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay, ...rest }) => {
  // console.log(rest);
  return {
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(isLastDay && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  };
});

const initialDate = new Date().toDateString();
const dateToString = (date) => new Date(date).toDateString();
const MUIStaticDateRangePicker = (props) => {
  const {
    value: initialValue,
    onAccept,
    onChangeValue,
    disabled,
    startText,
      } = props;

  const [dateState, setDateState] = React.useState({
    start: new Date(initialDate),
    end: new Date(initialDate),
    value: new Date(initialDate),
  });

  const { t, i18n } = useTranslation();
  const localeMap = {
    ar: arLocale,
    en: enLocale,
  };
  const locale = localeMap[i18n.language] || enLocale; 
  
  React.useEffect(() => {
    if (initialValue[0])
      setDateState({
        start: new Date(dateToString(initialValue[0])),
        end: new Date(dateToString(initialValue[1])),
        value: new Date(dateToString(initialValue[0])),
      });

    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { start, end, value } = dateState;

  ////////////* DateRange State */////////////////

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!start) {
      return <PickersDay />;
    }

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  ////////////* DateRange State */////////////////

  const [updateNumber, setUpdateNumbner] = useState(0);

  const handleCloseDateRange = (data) => {
    onAccept(data);
    setUpdateNumbner(0);
  };

  const closeDate = updateNumber >= 1;
  ////////////* onChange Function */////////////////

  const onChangeDate = (newValue) => {
    if (
      (start.getDate() === newValue.getDate() &&
        start.getMonth() === newValue.getMonth()) ||
      value.toUTCString() === newValue.toUTCString()
    ) {
      setDateState((prev) => ({
        ...prev,
        start: newValue,
        end: newValue,
        value: newValue,
      }));
      onChangeValue([newValue, newValue]);
      setUpdateNumbner((prev) => prev + 1);
      closeDate && handleCloseDateRange([newValue, newValue]);
      return;
    }

    if (value === end && newValue < end) {
      setDateState((prev) => ({ ...prev, start: newValue, value: newValue }));
      onChangeValue([newValue, end]);
      setUpdateNumbner((prev) => prev + 1);
      closeDate && handleCloseDateRange([newValue, end]);
      return;
    }

    if (value === start && newValue > start) {
      setDateState((prev) => ({ ...prev, end: newValue, value: newValue }));
      onChangeValue([start, newValue]);
      setUpdateNumbner((prev) => prev + 1);
      closeDate && handleCloseDateRange([start, newValue]);
      return;
    }

    if (start > newValue || start > end) {
      setDateState((prev) => ({
        ...prev,
        start: newValue,
        end: newValue,
        value: newValue,
      }));
      onChangeValue([newValue, newValue]);
      setUpdateNumbner((prev) => prev + 1);

      return;
    }

    setDateState((prev) => ({ ...prev, end: newValue, value: newValue }));
    onChangeValue([start, newValue]);
    setUpdateNumbner((prev) => prev + 1);
    closeDate && handleCloseDateRange([start, newValue]);
  };


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          showToolbar={false}
          label={startText || t("theDate")}
          value={null}
          disableHighlightToday
          onChange={onChangeDate}
          renderDay={renderWeekPickerDay}
          disableMaskedInput={true}
          closeOnSelect={false}
          disabled={disabled}
          disableOpenPicker
          renderInput={(params) => <TextField {...params} />}
          inputFormat="'Week of' MMM d"
        />
      </LocalizationProvider>
    </>
  );
};
MUIStaticDateRangePicker.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

export default MUIStaticDateRangePicker;
