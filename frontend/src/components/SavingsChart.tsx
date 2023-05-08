import {
    Bar,
    CartesianGrid, ComposedChart,
    Legend, Line,
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

export default function SavingsChart({
    data,
    savingsGoal,
    setQuery,
    setMonths
}:{
    data:Summary[],
    savingsGoal: number
    setQuery: (query:string) => void,
    setMonths: (months: string[]) => void
}){
    const dataSet = data.map(d => {
        return{month: d.month,saving: d.diff, goal: savingsGoal}
    });
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));


    return (
        <>
        {savingsGoal !==-1 &&
            <Stack width="100%">
                {matches &&
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"center"}}>
                        Savings overview
                    </Typography>
                }
                <SelectMonthPeriod setQuery={setQuery} setMonths={setMonths}/>
                <ResponsiveContainer width="100%" height={270}>
                    <ComposedChart height={270} data={dataSet}
                              margin={{top: 0, right: 0, left: 0, bottom: 10}}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tick={{fill: 'white',fontSize:"0.6rem"}}/>
                        <YAxis tick={{fill: 'white',fontSize:"0.6rem"}}/>
                        <Tooltip />
                        <Legend/>
                        <Bar dataKey="saving" fill="#a594f9" />
                        <Line type="monotone" dataKey="goal" stroke="#ff9100" />
                    </ComposedChart>
                </ResponsiveContainer>
            </Stack>
        }
        </>
    )}