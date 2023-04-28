import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import Transaction from "../types/Transaction";
import useByCategory from "../hooks/useByCategory";

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
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
export default function ChartGallery({transactions} : {transactions: Transaction[]}) {
    const transactionsByCategory = useByCategory(transactions);

    const data = transactionsByCategory.map(t => {
        return {name: t.category, value: parseFloat(t.sum)}
    });

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart width={200} height={200}>
                <Pie data={data}
                     dataKey="value"
                     nameKey="name"
                     cx="50%"
                     cy="50%"
                     labelLine={false}
                     label={renderCustomizedLabel}
                     outerRadius={100}
                     innerRadius={65}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              stroke={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Legend verticalAlign="bottom"/>
            </PieChart>
        </ResponsiveContainer>
    )
}