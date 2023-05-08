import {
    Bar, BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React from "react";
import {Stack, useMediaQuery, useTheme} from "@mui/material";
import SelectMonthPeriod from "./SelectMonthPeriod";
import Summary from "../types/summary";
import Typography from "@mui/material/Typography";

export default function BarChartSummary({
    data,
    setQuery,
    setMonths
}:{
    data:Summary[],
    setQuery: (query:string) => void,
    setMonths: (months: string[]) => void
}){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Stack width="100%">
            {matches &&
                <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"center"}}>
                    Income-Expenses overview
                </Typography>
            }
            <SelectMonthPeriod setQuery={setQuery} setMonths={setMonths}/>
            <ResponsiveContainer width="100%" height={270}>
                <BarChart height={270} data={data}
                          margin={{top: 0, right: 0, left: 0, bottom: 10}}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{fill: 'white',fontSize:"0.6rem"}}/>
                    <YAxis tick={{fill: 'white',fontSize:"0.6rem"}}/>
                    <Tooltip />
                    <Legend/>
                    <Bar dataKey="income" fill="#8884d8" />
                    <Bar dataKey="expenses" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Stack>
    )}