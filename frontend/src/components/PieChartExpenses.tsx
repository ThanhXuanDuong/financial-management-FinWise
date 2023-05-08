import React from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import Data from "../types/data";
import SelectDatePeriod from "./SelectDatePeriod";
import {Stack, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";

const COLORS = ["#00C49F","#FF8042","#0088FE", "#FFBB28",
                "#7678ed","#386641","#3b8ea5","#ff4d6d","#ffd60a"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 2.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            style={{transitionDelay: "2",fontSize:"0.8rem"}}
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export default function PieChartExpenses({
    data,
    setQuery,
    dateDistance,
    setDateDistance
}:{
    data:Data[],
    setQuery: (query:string) => void,
    dateDistance: number,
    setDateDistance: (dateDistance: number) => void
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Stack width="100%">
            {matches &&
                <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"center"}}>
                    Expenses
                </Typography>
            }
            <SelectDatePeriod setQuery={setQuery}
                              dateDistance={dateDistance}
                              setDateDistance={setDateDistance}
            />
            <ResponsiveContainer width="100%" height={270}>
                <PieChart height={250}>
                    <Pie data={data}
                         dataKey="value"
                         cx="50%"
                         cy="50%"
                         labelLine={true}
                         label={renderCustomizedLabel}
                         outerRadius={70}
                         innerRadius={50}
                         isAnimationActive={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name}
                                  fill={COLORS[index % COLORS.length]}
                                  stroke={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" margin={{ top: 20, left: 0, right: 0, bottom: 0 }}/>
                </PieChart>
            </ResponsiveContainer>
        </Stack>
)}