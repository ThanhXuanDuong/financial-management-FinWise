import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, ResponsiveContainer
} from "recharts";
import Data from "../types/data";

export default function BarChartCategories({data}:{data:Data[]}){
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart width={400} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
        </ResponsiveContainer>
)}