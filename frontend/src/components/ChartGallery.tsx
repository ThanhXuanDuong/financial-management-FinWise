import Transaction from "../types/Transaction";
import useByCategory from "../hooks/useByCategory";
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Data from "../types/data";
import {useState} from "react";
import PieChartCategories from "./PieChartCategories";

const charts = [
    {art: "pie", title:""},
    {art: "horizontal bar", title:""},
    {art: "area", title:""}
];

export default function ChartGallery({transactions} : {transactions: Transaction[]}) {
    const transactionsByCategory = useByCategory(transactions);

    const data : Data[] = transactionsByCategory.map(t => {
        return {name: t.category, value: parseFloat(t.sum)}
    });

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
        <Box display="flex">
            <IconButton onClick={() => goToPrevious()}>
                <ArrowBackIosIcon/>
            </IconButton>
            {currIndex === 0 &&
                <PieChartCategories data={data}/>
            }
            {currIndex === 1 &&
                <PieChartCategories data={data}/>
            }
            {currIndex === 2 &&
                <PieChartCategories data={data}/>
            }
            <IconButton onClick={() => goToNext()}>
                <ArrowForwardIosIcon/>
            </IconButton>
        </Box>
    )
}