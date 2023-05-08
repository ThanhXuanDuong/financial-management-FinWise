import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer, Cell
} from "recharts";
import Data from "../types/data";
import React from "react";
import SelectDatePeriod from "./SelectDatePeriod";
import {Stack} from "@mui/material";

export default function BarChartExpenses({data, setQuery}:{data:Data[], setQuery: (query:string) => void}){
    const sortedData = [...data].sort((a, b) => a.value - b.value).reverse();

    return (
        <Stack width="100%">
            <SelectDatePeriod setQuery={setQuery}/>
            <ResponsiveContainer width="100%" height={270}>
                <BarChart  width={400} height={270} data={sortedData}
                           margin={{top: 0, right: 20, left: 10, bottom: 10}}
                           layout="vertical"
                           barCategoryGap="20%"
                           barGap={2}
                           maxBarSize={10}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
                    <XAxis type="number" tick={{fill: 'white',fontSize:"0.8rem"}}/>
                    <YAxis type="category" dataKey="name" tick={{fill: 'white',fontSize:"0.8rem"}}/>
                    <Tooltip />
                    <Bar dataKey="value"
                         label={{position: 'bottom', fill:'white',fontSize:"0.6rem"}}
                         fill="#00C49F"
                    >
                        {sortedData.map((entry) => (
                            <Cell key={entry.name}/>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            </Stack>
    )}