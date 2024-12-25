import React from "react";
import { Grid } from "@mui/material";
import CustomSpinner from "../CustomSpinner";

export default function FullScreenLoading(props) {
    const { size, minHeight, name, height } = props;

    return (
        <Grid
            container
            alignContent="center"
            justifyContent="center"
            sx={{
                paddingY: minHeight ?? 0,
                ...(height && { height: height }),
            }}
            {...props}
        >
            {props.children}
            <CustomSpinner
                name={name ?? "PulseLoader"}
                speedMultiplier={1.3}
                size={size ?? 15}
            />
        </Grid>
    );
}
