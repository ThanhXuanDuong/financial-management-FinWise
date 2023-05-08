import NavBar from "../components/NavBar";
import ChartGallery from "../components/ChartGallery";
import TransactionGalery from "../components/TransactionGallery";
import useAuth from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import Transaction from "../types/Transaction";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const charts = [
    {art: "pie", title:"Expenses"},
    {art: "horizontal bar", title:"Expenses ranking"},
    {art: "bar", title:"Income-Expenses overview"},
    {art: "composed", title:"Savings overview"}
];
function getDateFromNow(dateDistance: number) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - dateDistance);
}
function getMonthFromNow(monthDistance: number) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth()- monthDistance+1);
}
export  function dateQuery(distance: number, ofDate:boolean){
    let dateLte = new Date().toISOString().substring(0,10);
    let dateGte = ofDate
                    ? getDateFromNow(distance).toISOString().substring(0,10)
                    : getMonthFromNow(distance).toISOString().substring(0,10);
    return "between?gte=" + dateGte + "&lte=" + dateLte;
}
export default function DashboardPage(){
    const {user} = useAuth();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [query, setQuery] = useState<string>(dateQuery(30,true));

    const [transactionOverview, setTransactionOverview] = useState<Transaction[]>([]);
    const [queryOverview, setQueryOverview] = useState<string>(dateQuery(6,false));

    const [title, setTitle] = useState<string>(charts[1].title);
    const [savingsGoal, setSavingsGoal] = useState<number>(-1);

    useEffect(() => {
        if (!user || !query) return;
        (async () => {
            try{
                const res = await axios.get(`/api/transactions/${user.id}/${query}`);
                setTransactions(res.data);
            }catch(e){
                alert("Error while loading data");
            }
        })()
    },[query, user])

    useEffect(() => {
        if (!user || !queryOverview) return;
        (async () => {
            try{
                const res = await axios.get(`/api/transactions/${user.id}/${queryOverview}`);
                setTransactionOverview(res.data);
            }catch(e){
                alert("Error while loading data");
            }
        })()
    },[queryOverview, user])

    useEffect(() => {
        (async () => {
            try{
                const res = await axios.get("/api/saving");
                setSavingsGoal(res.data.goal);
            }catch(e){
                alert("Error while loading data");
            }
        })()
    },[])

    return (
        <>
            { user &&
                <Box  sx = {{width: "100%", marginTop: "64px"}}>
                    <NavBar title ={title} setSavingsGoal={setSavingsGoal}/>

                    <Grid container
                          spacing={2}
                          justifyContent = "center"
                          alignItems="center"
                    >
                        <Grid item xl={8} lg={7} md={7} sm={12} xs={12}>
                            <ChartGallery transactions={transactions}
                                          transactionOverview={transactionOverview}
                                          charts={charts}
                                          savingsGoal={savingsGoal}
                                          setTitle={setTitle}
                                          setQuery={setQuery}
                                          setQueryOverview={setQueryOverview}
                            />
                        </Grid>
                        <Grid item xl={4} lg={5} md={5} sm={12} xs={12}>
                            <TransactionGalery transactions={transactions}/>
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
    )
}