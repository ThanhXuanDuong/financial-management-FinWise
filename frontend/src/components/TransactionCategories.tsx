import React from "react";
import Transaction from "../types/Transaction";
import Box from "@mui/material/Box";
import CategoryAccordion from "./CategoryAccordion";
import useByCategory from "../hooks/useByCategory";

export default function TransactionCategories({transactions}:{transactions:Transaction[]}){
    const transactionsByCategory = useByCategory(transactions);

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