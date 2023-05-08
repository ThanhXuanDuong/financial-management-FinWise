import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from "@mui/material/Box";
import {useState} from "react";
import {dateQuery} from "../pages/DashboardPage";

export function getMonths(monthDistance: number){
    const months = [];
    const now = new Date();
    for (let i=0; i< monthDistance; i++){
        const month = new Date(now.getFullYear(), now.getMonth()- i+1)
        months[i] = month.toISOString().substring(0,7)
    }
    return months.reverse();
}
export default function SelectMonthPeriod({
    setQuery,
    setMonths
}:{
    setQuery: (query:string) => void,
    setMonths: (months: string[]) => void
}) {
    const [monthDistance, setMonthDistance] = useState<number>(6);
    const handleChange = (event: SelectChangeEvent) => {
        setMonthDistance(parseInt(event.target.value));
        setQuery(dateQuery(parseInt(event.target.value), false));
        setMonths(getMonths(parseInt(event.target.value)));
    };

    return (
        <Box display="flex" justifyContent="flex-start">
            <FormControl variant="standard" size="small" sx={{ mb: 2, minWidth: 80 }}>
                <Select
                    labelId="select-standard-label"
                    id="select-standard"
                    value={monthDistance.toString()}
                    onChange={handleChange}
                    label="Period"
                    sx={{fontSize: "0.8rem"}}
                >
                    <MenuItem value={6} sx={{fontSize: "0.8rem"}}>last 6 months</MenuItem>
                    <MenuItem value={12} sx={{fontSize: "0.8rem"}}>last 12 months</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}