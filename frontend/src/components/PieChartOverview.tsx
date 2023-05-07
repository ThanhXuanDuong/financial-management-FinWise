import React from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import Data from "../types/data";

const COLORS = ["#00C49F","#FF8042","#0088FE", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            style={{transitionDelay: "2"}}
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
export default function PieChartOverview({data1,data2}:{data1:Data[],data2:Data[]}) {

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart height={250}>
                <Pie data={data2}
                     dataKey="value"
                     cx="50%"
                     cy="50%"
                     labelLine={true}
                     label
                     outerRadius={70}
                     innerRadius={50}
                     isAnimationActive={false}
                >
                    {data2.map((entry, index) => (
                        <Cell key={entry.name}
                              fill={COLORS[index % COLORS.length]}
                              stroke={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Legend verticalAlign="bottom"/>
            </PieChart>
        </ResponsiveContainer>
)}