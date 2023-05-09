import AddTransactionButton from "./AddTransactionButton";
import Container from "@mui/material/Container";
import React from "react";
import Transaction from "../types/Transaction";
import TransactionTable from "./TransactionTable";
import Box from "@mui/material/Box";
import Filter from "./Filter";
import TransactionCategories from "./TransactionCategories";
import {useMediaQuery, useTheme} from "@mui/material";

export default function TransactionGallery({transactions} : {transactions: Transaction[]}){
    const [filter, setFilter] = React.useState('time');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Container sx ={{minHeight:"100vh",
                        backgroundColor: "primary.main",
                        paddingY: 5,
                        borderRadius:matches ? 0: "2rem 2rem 0 0"}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Filter filter={filter} setFilter={setFilter}/>
                <AddTransactionButton/>
            </Box>
            {filter === "category" &&
                <TransactionCategories transactions={transactions}/>}
            {filter === "time" &&
                <TransactionTable transactions={transactions}/>}
        </Container>

    )
}