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
import {Stack} from "@mui/material";
import SelectMonthPeriod from "./SelectMonthPeriod";
import Summary from "../types/summary";

export default function BarChartSummary({
    data,
    setQuery,
    setMonths
}:{
    data:Summary[],
    setQuery: (query:string) => void,
    setMonths: (months: string[]) => void
}){

    return (
        <Stack width="100%">
            <SelectMonthPeriod setQuery={setQuery} setMonths={setMonths}/>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart height={250} data={data}
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