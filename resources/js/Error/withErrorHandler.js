/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { gql, useApolloClient } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import { Box, Button, Collapse, Typography, useTheme } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
const ONERROR = gql`
  query error {
    graphQLErrors @client
    networkError @client
    hasError @client
  }
`;

const withErrorHandler = (WarppedComponent) => {
  return graphql(ONERROR)((props) => {
    const { data: errors } = props;

    const client = useApolloClient();

    const clearErrors = () => {
      return client.cache.writeQuery({
        query: gql`
          query error {
            graphQLErrors @client
            networkError @client
            hasError @client
          }
        `,
        data: {
          graphQLErrors: null,
          networkError: null,
          hasError: false,
        },
      });
    };
    useEffect(() => {
      if (errors.hasError) {
        clearErrors();
      }
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.history.location.pathname]);

    const theme = useTheme();
    const { t } = useTranslation();

    const dir = theme.direction;
    const errorExtensions = errors?.graphQLErrors?.[0].extensions;
    const category = errorExtensions?.category;
    const versionNotSupportedError =
      errorExtensions?.code === "VERSION_NOT_SUPPORTED";
    let component = <WarppedComponent {...props} />;

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
      if (category === "authorization") {
        enqueueSnackbar(errors.graphQLErrors[0].message, {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          TransitionComponent: Collapse,
        });
      }

      return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    if (
      (category &&
        !["validation", "custom", "authorization"].includes(category)) ||
      errors?.networkError ||
      versionNotSupportedError
    ) {
      component = (
        <WarppedComponent {...props}>
          <Box
            sx={{
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              position: "absolute",
              textAlign: "center",
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: "100px" ,color:"gray"}}
            />

            <Typography variant="h6" sx={{ mt: 2,color:"gray" }}>
              {versionNotSupportedError ? t("pleaseReload") : t("serverError")}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              size="medium"
              onClick={() => {
                window.location.reload();
              }}
              color="primary"
            >
              {t("tryAgain")}
            </Button>
          </Box>
        </WarppedComponent>
      );
    }

    return component;
  });
};

export default withErrorHandler;
