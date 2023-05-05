import AddTransactionButton from "./AddTransactionButton";
import Container from "@mui/material/Container";
import React from "react";
import Transaction from "../types/Transaction";
import TransactionTable from "./TransactionTable";
import Box from "@mui/material/Box";
import Filter from "./Filter";
import TransactionCategories from "./TransactionCategories";

export default function TransactionGallery({transactions} : {transactions: Transaction[]}){
    const [filter, setFilter] = React.useState('time');

    return (
        <Container sx ={{backgroundColor: "primary.main", paddingY: 5}}>
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