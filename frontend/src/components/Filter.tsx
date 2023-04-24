import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";

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
        <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="time">Time</ToggleButton>
            <ToggleButton value="category">Category</ToggleButton>
        </ToggleButtonGroup>
    );
}