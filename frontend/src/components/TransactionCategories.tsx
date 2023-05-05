import React from "react";
import Transaction from "../types/Transaction";
import Box from "@mui/material/Box";
import CategoryAccordion from "./CategoryAccordion";
import useByCategory from "../hooks/useByCategory";
import themeLight from "../themes/themeLight";
import {ThemeProvider} from "@emotion/react";

export default function TransactionCategories({transactions}:{transactions:Transaction[]}){
    const transactionsByCategory = useByCategory(transactions);

    return (
        <ThemeProvider theme={themeLight}>
            <Box display="flex" flexDirection="column" gap={1}>
                {transactionsByCategory.map(t =>
                    (t.count > 0 && parseFloat(t.sum) !== 0 )
                    ? <CategoryAccordion key={t.category.name}
                                       category={t.category}
                                       count={t.count}
                                       sum={t.sum}
                                       filtered={t.filtered}
                        />
                    : null
                )}
            </Box>
        </ThemeProvider>

    )
}