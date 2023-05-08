import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from "@mui/material/Box";
import {dateQuery} from "../pages/DashboardPage";

export default function SelectDatePeriod({
    setQuery,
    dateDistance,
    setDateDistance
}:{
    setQuery: (query:string) => void,
    dateDistance: number,
    setDateDistance: (dateDistance: number) => void
}) {
    const handleChange = (event: SelectChangeEvent) => {
        setDateDistance(parseInt(event.target.value));
        setQuery(dateQuery(parseInt(event.target.value),true));
    };

    return (
        <Box display="flex" justifyContent="flex-start">
            <FormControl variant="standard" size="small" sx={{ mb: 2, minWidth: 80 }}>
                <Select
                    labelId="select-standard-label"
                    id="select-standard"
                    value={dateDistance.toString()}
                    onChange={handleChange}
                    label="Period"
                    sx={{fontSize: "0.8rem"}}
                >
                    <MenuItem value={7} sx={{fontSize: "0.8rem"}}>last 7 days</MenuItem>
                    <MenuItem value={30} sx={{fontSize: "0.8rem"}}>last 30 days</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}