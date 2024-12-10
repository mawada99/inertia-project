import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={1} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled(({ handleChange, ...props }) => (
    <MuiAccordionSummary
        expandIcon={
            <IconButton size="medium" aria-label="expand" onClick={handleChange()}>
                <ArrowForwardIosSharpIcon
                    sx={{ fontSize: '0.9rem' }} />
            </IconButton>
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: theme.palette.background.appTitle,
    cursor: "auto",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper': {
        transform: theme.direction === "rtl" ? 'rotate(180deg)' : ''
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({

}));

export default function CustomAccordions(props) {
    const { title, body, expandedValue } = props
    const [expanded, setExpanded] = React.useState(!!expandedValue);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(prev => !prev);
    };

    return (
        <div>
            <Accordion expanded={expanded}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" handleChange={handleChange}>
                    {title}
                </AccordionSummary>
                <AccordionDetails>
                    {body}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}