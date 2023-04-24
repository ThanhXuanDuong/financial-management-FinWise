import React from "react";
import Transaction from "../types/Transaction";
import Box from "@mui/material/Box";

export default function TransactionCategories({transactions}:{transactions:Transaction[]}){
    let categories = ["shopping", "internet", "transport","abc"];

    const transactionsByCategory = categories.map( category => {
        const filtered = transactions.filter(t => t.category === category);

        const sum = filtered.length >0
            ? filtered.map(f => f.amount).reduce((a,b) => a+b)
            :0 ;

        return {category: category, count:filtered.length, sum: sum};
    });

    return (
        <>
            {transactionsByCategory.map(t =>
                <Box display="flex" justifyContent="space-between">
                    <div>{t.category}</div>
                    <div>{t.count}</div>
                    <div>{t.sum}</div>
                </Box>)
            }
        </>

    )
}