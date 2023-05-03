import NavBar from "../components/NavBar";
import ChartGallery from "../components/ChartGallery";
import TransactionGalery from "../components/TransactionGallery";
import Box from "@mui/material/Box";
import useAuth from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import Transaction from "../types/Transaction";
import axios from "axios";

export default function DashboardPage(){
    const {user} = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (!user) return;
        try {
            (async () => {
                const res = await axios.get("/api/transactions/user/" + user.id);
                setTransactions(res.data);
            })()
        } catch (e){
            alert("Error while loading data");
        }
    },[user])

    return (
        <>
            { user &&
            <Box width="100%" height="100vh" sx = {{marginTop: "64px"}}>
                <NavBar/>
                <ChartGallery transactions={transactions}/>
                <TransactionGalery transactions={transactions}/>
            </Box>}
        </>
    )
}