import { Button, Grid, IconButton, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clear, Search } from "@mui/icons-material";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { urlParameters } from "../../CustomFunctions/urlParameters";
import { windowUrl } from "../../CustomFunctions/pushUrl";
import MUItextField from "../../MUI/MUItextField";

const PREFIX = "shipmentListFilters";

const classes = {
  button: `${PREFIX}-button`,
  btnMargin: `${PREFIX}-btnMargin`,
  searchForm: `${PREFIX}-searchForm`,
  searchField: `${PREFIX}-searchField`,
  overlay: `${PREFIX}-overlay`,
  searchPadding: `${PREFIX}-searchPadding`,
  icon: `${PREFIX}-icon`,
};

const Root = styled(Grid)(({ theme }) => ({
  [`& .${classes.button}`]: {
    position: "sticky",
    bottom: 0,
    zIndex: 3,
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 7,
  },

  [`& .${classes.btnMargin}`]: {
    width: "100%",
  },

  [`&.${classes.searchForm}`]: {
    width: "100%",
    margin: 0,
    [theme.breakpoints.down("md")]: {
      // flex: " 1 0 100%",
    },
  },

  [`& .${classes.searchPadding}`]: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },

  [`& .${classes.searchPadding}`]: {
    "& span": {
      margin: 0,
    },
  },
}));

const SearchFilter = ({
  loading,
  resetPage,
  onSubmitFunc,
  queryVariables,
  rowsPerPage,
  preventPushUrl,
  pathname,
  clearCheckBox,
}) => {
  const { handleSubmit, register, errors, watch, setValue } = useForm();

  const history = useHistory();

  const urlQuery = urlParameters(window.location.search);

  const validUrlParameters = Object.keys(urlQuery).length !== 0;

  const initSearch = () => {
    let searchParameters = {
      refetch: true,
    };
    if (validUrlParameters) {
      if (urlQuery["search"])
        urlQuery["search"] = urlQuery["search"].toString().trim();
      const searchParams = { ...urlQuery };
      delete searchParams["rowsPerPage"];
      if (searchParams["search"])
        searchParams["search"] = searchParams["search"]
          .split(",")
          .filter((i) => i.trim() !== "")
          .map((i) => i.trim());
      searchParameters = searchParams;
    }
    return searchParameters;
  };
  const [search, setSearch] = useState(initSearch());

  const pushUrlSearch = (param) => {
    if (preventPushUrl) return;
    const queryParams = [];
    for (const i in param) {
      encodeURIComponent(param[i]) &&
        queryParams.push(
          encodeURIComponent(i) + "=" + encodeURIComponent(param[i])
        );
    }
    const queryString = queryParams.join("&");

    const url = history.createHref({
      pathname: `/admin/${pathname}`,
      search: "?" + queryString,
    });
    windowUrl(url);
  };

  useEffect(() => {
    queryVariables(search);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onSubmit = (data) => {
    onSubmitFunc && onSubmitFunc(data);

    clearCheckBox && clearCheckBox();

    let handledData = {};

    for (const key in handledData) {
      if ([undefined, "", null].includes(handledData[key])) {
        delete handledData[key];
      }
    }

    if (data.search) {
      handledData = {
        search: data.search.toString(),
      };
    }

    resetPage();
    const newUrlParameters = { ...handledData };

    pushUrlSearch({
      ...newUrlParameters,
      rowsPerPage,
      page: 0,
    });

    if (handledData.search) {
      handledData.search = handledData.search
        .split(",")
        .filter((i) => i.trim() !== "")
        .map((i) => i.trim());
    }
    setSearch((prev) => ({
      // ...prev,
      ...handledData,
      refetch: !prev.refetch,
    }));
  };

  const clearCode = () => {
    setValue("search", "");
    pushUrlSearch({});
    resetPage();
    setSearch((prev) => ({
      refetch: !prev.refetch,
    }));
  };

  useEffect(() => {
    urlQuery["search"] && setValue("search", urlQuery["search"].toString());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  return (
    <Root
      container
      item
      justifyContent="center"
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      className={classes.searchForm}
      alignContent="flex-start"
    >
      <Grid
        container
        item
        sm={6}
        justifyContent="flex-start"
        spacing={1}
        className={classes.searchPadding}
        flexWrap={"nowrap"}
      >
        <Grid container item xs={10} md={10} alignItems="flex-start">
          <MUItextField
            label={t("search")}
            name={"search"}
            variant="outlined"
            inputProps={{
              dir: "ltr",
            }}
            onPaste={(e) => {
              e.preventDefault();
              const input = e.target;
              const inputValue = e.clipboardData.getData("Text");
              // .replace(/\n/g, ",");

              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              ).set;
              nativeInputValueSetter.call(input, input.value + inputValue);

              input.dispatchEvent(new Event("input", { bubbles: true }));
            }}
            onKeyPress={(e) => {
              const value = e.target.value.trim();

              if (e.key === "Enter") {
                // e.preventDefault();
                setValue("search", `${value}`);
              }
            }}
            formType={"requireFalse"}
            register={register}
            errors={errors}
            InputProps={{
              endAdornment: Boolean(watch("search")) && (
                <InputAdornment position="end">
                  <IconButton
                    disabled={loading}
                    aria-label="code"
                    onClick={clearCode}
                    edge="end"
                    size="large"
                  >
                    <Clear color="error" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            watch={watch("search")}
          />
        </Grid>
        <Grid container item xs={2} md={2} alignItems="flex-start">
          <Button
            className={clsx(classes.btnMargin)}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={{
              boxShadow: 0,
              padding: 0,
              height: "100%",
              minWidth: "100%",
            }}
            startIcon={<Search className={clsx(classes.icon)} />}
            disabled={loading}
          ></Button>
        </Grid>
      </Grid>
    </Root>
  );
};

export default memo(
  SearchFilter,
  (prevProps, nextProps) =>
    prevProps.loading === nextProps.loading &&
    prevProps.rowsPerPage === nextProps.rowsPerPage
);
