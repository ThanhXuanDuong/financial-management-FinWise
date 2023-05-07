import Transaction from "../types/Transaction";
import useByCategory from "../hooks/useByCategory";
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Data from "../types/data";
import {useState} from "react";
import PieChartExpenses from "./PieChartOverview";
import BarChartExpenses from "./BarChartExpenses";
import AreaChartSummary from "./AreaChartSummary";
import useByTimePeriod from "../hooks/useByTimePeriod";
import Summary from "../types/summary";

export default function ChartGallery({
    transactions,
    charts,
    setTitle
} : {
    transactions: Transaction[],
    charts:{art:string,title:string}[],
    setTitle: (title:string) => void
}) {
    const transactionsByCategory = useByCategory(transactions);

    const dataByCategory : Data[] = transactionsByCategory.map(t => {
        return {name: t.category.name, value: parseFloat(t.sum)}
    });

    const expenses = dataByCategory.filter(d => d.value<0).map(d => {
        return {name: d.name, value: -d.value}
    });
    const income = dataByCategory.filter(d => d.value>0).map(d => {
        return {name: d.name, value: d.value}
    });

    const summaryByTimePeriod: Summary[] = useByTimePeriod(transactions);

    const [currIndex, setCurrIndex] = useState<number>(0);
    const goToPrevious = ()=> {
        const newIndex = (currIndex === 0)
            ? charts.length -1
            : currIndex - 1;
        setCurrIndex(newIndex);
        setTitle(charts[newIndex].title);
    };

    const goToNext = () => {
        const newIndex = (currIndex === charts.length -1)
            ? 0
            : currIndex + 1;
        setCurrIndex(newIndex);
        setTitle(charts[newIndex].title);
    };

    return (
        <Box display="flex" marginY={2}>
            <IconButton onClick={() => goToPrevious()}>
                <ArrowBackIosIcon/>
            </IconButton>
            {currIndex === 0 &&
                <PieChartExpenses data1={income} data2={expenses}/>
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
    )
}