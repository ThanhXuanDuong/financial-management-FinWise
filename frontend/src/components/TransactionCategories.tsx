import React from "react";
import Transaction from "../types/Transaction";
import Box from "@mui/material/Box";
import CategoryAccordion from "./CategoryAccordion";

export default function TransactionCategories({transactions}:{transactions:Transaction[]}){
    let categories = ["shopping", "internet", "transport"];

    const transactionsByCategory = categories.map( category => {
        const filtered = transactions.filter(t => t.category === category);

        const sum = filtered.length >0
            ? filtered.map(f => f.amount)
                .reduce((a,b) =>
                    (parseFloat(a) + parseFloat(b)).toString()
                )
            :"0" ;

        return {category: category, count:filtered.length, sum: sum, filtered:filtered};
    });

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {transactionsByCategory.map(t =>
                <CategoryAccordion key={t.category}
                                   category={t.category}
                                   count={t.count}
                                   sum={t.sum}
                                   filtered={t.filtered}
                />)
            }
        </Box>

    )
}