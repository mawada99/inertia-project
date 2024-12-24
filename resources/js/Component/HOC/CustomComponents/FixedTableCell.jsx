import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";

const PREFIX = "FixedTableCell";

const classes = {
    cellWidth: `${PREFIX}-cellWidth`,
    cellWidthAuto: `${PREFIX}-cellWidthAuto`,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`& .${classes.cellWidth}`]: {
        whiteSpace: "normal",
        maxWidth: "200px",
        inlineSize: "max-content",
    },
    [`& .${classes.cellWidthAuto}`]: {
        whiteSpace: "normal",
        maxWidth: "auto",
        inlineSize: "max-content",
    },
}));

export const FixedTableCell = memo((props) => {
    const { allowPlaceholder = true, dir, auto, ...restProps } = props;
    const { t } = useTranslation();
    return (
        <StyledTableCell {...restProps}>
            <div
                className={auto ? classes.cellWidthAuto : classes.cellWidth}
                dir={dir}
            >
                {props.children ?? (allowPlaceholder && t("placeholder"))}
            </div>
        </StyledTableCell>
    );
});
