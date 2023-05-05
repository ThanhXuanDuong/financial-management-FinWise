import NavBar from "../components/NavBar";
import ChartGallery from "../components/ChartGallery";
import TransactionGalery from "../components/TransactionGallery";
import useAuth from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import Transaction from "../types/Transaction";
import axios from "axios";
import Container from "@mui/material/Container";

export default function DashboardPage(){
    const {user} = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try{
                const res = await axios.get("/api/transactions/user/" + user.id);
                setTransactions(res.data);
            }catch(e){
                alert("Error while loading data");
            }
        })()
    },[user])

    return (
        <>
            { user &&
                <>
                    <Container  sx = {{marginTop: "64px"}}>
                        <NavBar/>
                        <ChartGallery transactions={transactions}/>
                    </Container>
                    <TransactionGalery transactions={transactions}/>
                </>
            }
        </>
    )
}