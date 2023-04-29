import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import Data from "../types/data";

export default function BarChartExpenses({data}:{data:Data[]}){

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart  width={400} height={200} data={data}
                       margin={{top: 0, right: 40, left: 40, bottom: 20}}
                       layout="vertical"
                       barCategoryGap="20%"
                       barGap={2}
                       maxBarSize={10}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
                <XAxis type="number" tick={{fill: 'white'}}/>
                <YAxis type="category" dataKey="name" tick={{fill: 'white'}}/>
                <Tooltip />
                <Bar dataKey="value"
                     label={{position: 'right', fill:'white'}}
                     fill="#00C49F" />
            </BarChart>
        </ResponsiveContainer>
)}