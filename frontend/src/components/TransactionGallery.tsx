import AddTransactionButton from "./AddTransactionButton";
import Container from "@mui/material/Container";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Transaction from "../types/Transaction";
import TransactionTable from "./TransactionTable";
import Box from "@mui/material/Box";
import Filter from "./Filter";
import TransactionCategories from "./TransactionCategories";

export default function TransactionGallery({userId} : {userId: string}){
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filter, setFilter] = React.useState('time');

    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/transactions/user/" + userId);
            setTransactions(res.data);
        })()
    },[userId])

    return (
        <Container sx ={{backgroundColor: "primary.main"}}>
            <Box marginY={5}>
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