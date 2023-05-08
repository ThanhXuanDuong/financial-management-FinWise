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
import BarChartSummary from "./BarChartSummary";
import useSummaryByMonth from "../hooks/useSummaryByMonth";
import Summary from "../types/summary";
import {getMonths} from "./SelectMonthPeriod";
import SavingsChart from "./SavingsChart";

export default function ChartGallery({
    transactions,
    transactionOverview,
    charts,
    savingsGoal,
    setTitle,
    setQuery,
    setQueryOverview
} : {
    transactions: Transaction[],
    transactionOverview: Transaction[],
    charts:{art:string,title:string}[],
    savingsGoal:number,
    setTitle: (title:string) => void,
    setQuery: (query:string) => void,
    setQueryOverview: (queryOverview:string) => void,
}) {
    const transactionsByCategory = useByCategory(transactions);

    const dataByCategory : Data[] = transactionsByCategory.map(t => {
        return {name: t.category.name, value: parseFloat(t.sum)}
    });

    const expenses = dataByCategory.filter(d => d.value<0).map(d => {
        return {name: d.name, value: -d.value}
    });

    const [months, setMonths] = useState<string[]>(getMonths(6));
    const summaryByMonth: Summary[] = useSummaryByMonth(transactionOverview, months);

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
                <ArrowBackIosIcon sx={{fontSize:"1rem"}}/>
            </IconButton>
            {currIndex === 0 &&
                <PieChartExpenses data={expenses}
                                  setQuery={setQuery}/>
            }
            {currIndex === 1 &&
                <BarChartExpenses data={expenses}
                                  setQuery={setQuery}/>
            }
            {currIndex === 2 &&
                <BarChartSummary data={summaryByMonth}
                                 setQuery={setQueryOverview}
                                 setMonths={setMonths}/>
            }
            {currIndex === 3 &&
                <SavingsChart data={summaryByMonth}
                              savingsGoal={savingsGoal}
                              setQuery={setQueryOverview}
                              setMonths={setMonths}/>
            }
            <IconButton onClick={() => goToNext()}>
                <ArrowForwardIosIcon sx={{fontSize:"1rem"}}/>
            </IconButton>
        </Box>
    )
}