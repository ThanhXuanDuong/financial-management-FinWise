import Transaction from "../types/Transaction";
import useByCategory from "../hooks/useByCategory";
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Data from "../types/data";
import {useState} from "react";
import PieChartExpenses from "./PieChartExpenses";
import BarChartExpenses from "./BarChartExpenses";
import AreaChartSummary from "./AreaChartSummary";
import SelectTimePeriod from "./SelectTimePeriod";
import useByTimePeriod from "../hooks/useByTimePeriod";
import Summary from "../types/summary";

const charts = [
    {art: "pie", title:""},
    {art: "horizontal bar", title:""},
    {art: "area", title:""}
];

export default function ChartGallery({transactions} : {transactions: Transaction[]}) {
    const transactionsByCategory = useByCategory(transactions);

    const dataByCategory : Data[] = transactionsByCategory.map(t => {
        return {name: t.category, value: parseFloat(t.sum)}
    });

    const expenses = dataByCategory.filter(d => d.value<0).map(d => {
        return {name: d.name, value: -d.value}
    });

    const summaryByTimePeriod: Summary[] = useByTimePeriod(transactions);
    console.log(summaryByTimePeriod);

    const [currIndex, setCurrIndex] = useState<number>(0);
    const goToPrevious = ()=> {
        const newIndex = (currIndex === 0)
            ? charts.length -1
            : currIndex - 1;
        setCurrIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currIndex === charts.length -1)
            ? 0
            : currIndex + 1;
        setCurrIndex(newIndex);
    };

    return (
        <>
            <SelectTimePeriod/>
            <Box display="flex">
                <IconButton onClick={() => goToPrevious()}>
                    <ArrowBackIosIcon/>
                </IconButton>
                {currIndex === 0 &&
                    <PieChartExpenses data={expenses}/>
                }
                {currIndex === 1 &&
                    <BarChartExpenses data={expenses}/>
                }
                {currIndex === 2 &&
                    <AreaChartSummary data={summaryByTimePeriod}/>
                }
                <IconButton onClick={() => goToNext()}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Box>
        </>

    )
}