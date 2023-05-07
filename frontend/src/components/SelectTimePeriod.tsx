import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from "@mui/material/Box";
import {useState} from "react";
import {dateQuery} from "../pages/DashboardPage";

export default function SelectTimePeriod({
    setQuery
}:{
    setQuery: (query:string) => void
}) {
    const [dateDistance, setDateDistance] = useState<number>(30);
    const handleChange = (event: SelectChangeEvent) => {
        setDateDistance(parseInt(event.target.value));
        setQuery(dateQuery(parseInt(event.target.value)));
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl variant="standard" size="small" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={dateDistance.toString()}
                    onChange={handleChange}
                    label="Period"
                >
                    <MenuItem value={7}>last 7 days</MenuItem>
                    <MenuItem value={30}>last 30 days</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}