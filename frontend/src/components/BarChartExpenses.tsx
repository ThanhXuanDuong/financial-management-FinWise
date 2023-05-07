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

export default function BarChartExpenses({data}:{data:Data[]}){
    const sortedData = data.sort((a, b) => a.value - b.value).reverse();
    const arr = data.map(d => d.value);
    const maxValue = Math.max(...arr);

    const opacity= sortedData.map(d => d.value / maxValue);

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart  width={400} height={200} data={sortedData}
                       margin={{top: 0, right: 20, left: 0, bottom: 10}}
                       layout="vertical"
                       barCategoryGap="20%"
                       barGap={2}
                       maxBarSize={10}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
                <XAxis type="number" tick={{fill: 'white',fontSize:"12px"}}/>
                <YAxis type="category" dataKey="name" tick={{fill: 'white',fontSize:"12px"}}/>
                <Tooltip />
                <Bar dataKey="value"
                     label={{position: 'right', fill:'white',fontSize:"12px"}}
                     fill="#00C49F"
                >
                    {sortedData.map((entry, index) => (
                        <Cell key={entry.name}
                              fillOpacity={opacity[index]}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
)}