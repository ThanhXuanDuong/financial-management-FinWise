import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";
import {ThemeProvider} from "@emotion/react";
import themeLight from "../themes/themeLight";

export default function Filter({
    filter,
    setFilter
}:{
    filter: string,
    setFilter: (filter:string) => void
}) {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: string,
    ) => {
        setFilter(newFilter);
    };

    return (
        <ThemeProvider theme={themeLight}>
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton sx={{width: "8rem",height:"3rem"}} value="time">Time</ToggleButton>
                <ToggleButton sx={{width: "8rem",height:"3rem"}} value="category">Category</ToggleButton>
            </ToggleButtonGroup>
        </ThemeProvider>
    );
}