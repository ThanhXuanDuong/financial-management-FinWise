import NavBar from "../components/NavBar";
import ChartGallery from "../components/ChartGallery";
import TransactionGalery from "../components/TransactionGallery";
import useAuth from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import Transaction from "../types/Transaction";
import axios from "axios";
import Container from "@mui/material/Container";
import SelectTimePeriod from "../components/SelectTimePeriod";

const charts = [
    {art: "pie", title:"Expenses"},
    {art: "horizontal bar", title:"Expenses"},
    {art: "area", title:"Overview"}
];
function getDateFromNow(dateDistance: number) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - dateDistance);
}
export  function dateQuery(dateDistance: number){
    let dateLte = new Date().toISOString().substring(0,10);
    let dateGte = getDateFromNow(dateDistance).toISOString().substring(0,10);
    return "between?gte=" + dateGte + "&lte=" + dateLte;
}
export default function DashboardPage(){
    const {user} = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [query, setQuery] = useState<string>(dateQuery(30));
    const [title, setTitle] = useState<string>(charts[1].title);

    useEffect(() => {
        if (!user || query==="") return;
        (async () => {
            try{
                const res = await axios.get(`/api/transactions/${user.id}/${query}`);
                setTransactions(res.data);
            }catch(e){
                alert("Error while loading data");
            }
        })()
    },[query, user])

    return (
        <>
            { user &&
                <>
                    <Container  sx = {{marginTop: "64px"}}>
                        <NavBar title ={title}/>
                        <SelectTimePeriod setQuery={setQuery}/>
                        <ChartGallery transactions={transactions} charts={charts} setTitle={setTitle}/>
                    </Container>
                    <TransactionGalery transactions={transactions}/>
                </>
            }
        </>
    )
}