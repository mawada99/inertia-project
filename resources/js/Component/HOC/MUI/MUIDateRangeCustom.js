import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
const dateConverter = (data) => moment(data).locale("en").format("YYYY/MM/DD");
const MUIDateRangeCustom = (props) => {
  const {
    value: initialValue,
    variant,
    onChangeValue,
    disabled,
    startText,
    resetDate,
  } = props;

  const [dateState, setDateState] = React.useState({
    start: new Date(initialDate),
    end: new Date(initialDate),
    value: new Date(initialDate),
  });

  React.useEffect(() => {
    if (initialValue[0])
      setDateState({
        start: new Date(dateToString(initialValue[0])),
        end: new Date(dateToString(initialValue[1])),
        value: new Date(dateToString(initialValue[0])),
      });

    return () => { };
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

  const [dateRangeState, setDateRangeState] = useState(false);
  const [updateNumber, setUpdateNumbner] = useState(0);
  const handleOpenDateRange = (e) => {
    setDateRangeState(true);
  };

  const handleCloseDateRange = () => {
    setDateRangeState(false);
    setUpdateNumbner(0);
  };

  React.useEffect(() => {
    if (updateNumber > 1) {
      handleCloseDateRange();
    }
    return () => { };
  }, [updateNumber]);

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
      //closeDate && handleCloseDateRange();
      return;
    }

    if (value === end && newValue < end) {
      setDateState((prev) => ({ ...prev, start: newValue, value: newValue }));
      onChangeValue([newValue, end]);
      setUpdateNumbner((prev) => prev + 1);
      //closeDate && handleCloseDateRange();
      return;
    }

    if (value === start && newValue > start) {
      setDateState((prev) => ({ ...prev, end: newValue, value: newValue }));
      onChangeValue([start, newValue]);
      setUpdateNumbner((prev) => prev + 1);
      //closeDate && handleCloseDateRange();
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
    //closeDate && handleCloseDateRange();
  };

  const { t } = useTranslation();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          showToolbar={false}
          label={startText || t("theDate")}
          value={null}
          onChange={onChangeDate}
          renderDay={renderWeekPickerDay}
          disableMaskedInput={true}
          closeOnSelect={false}
          open={dateRangeState}
          onClose={handleCloseDateRange}
          onOpen={handleOpenDateRange}
          disabled={disabled}
          disableHighlightToday
          // onAccept={() => {
          //   if (end !== start) {
          //     setAnchorElDateRange(false);
          //   }
          // }}
          // InputProps={{

          // }}
          disableOpenPicker
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant={variant ?? "filled"}
              size="small"
              helperText={null}
              onClick={handleOpenDateRange}
              InputProps={{
                ...params.InputProps,

                ...(resetDate &&
                  initialValue[0] && {
                  endAdornment: (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();

                        resetDate(e);
                        setDateState({
                          start: new Date(initialDate),
                          end: new Date(initialDate),
                          value: new Date(initialDate),
                        });
                      }}
                    >
                      <Clear size="small" />
                    </IconButton>
                  ),
                }),
              }}
              inputProps={{
                ...params.inputProps,
                readOnly: true,
                value: initialValue[0]
                  ? `${dateConverter(start)} – ${dateConverter(end)}`
                  : "-",
              }}
            />
          )}
          inputFormat="'Week of' MMM d"
        />
      </LocalizationProvider>
    </>
  );
};
MUIDateRangeCustom.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

export default MUIDateRangeCustom;
