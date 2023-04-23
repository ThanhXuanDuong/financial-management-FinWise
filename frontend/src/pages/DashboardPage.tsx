import NavBar from "../components/NavBar";
import ChartGalery from "../components/ChartGalery";
import TransactionGalery from "../components/TransactionGalery";
import Box from "@mui/material/Box";

export default function DashboardPage(){
    return (
        <Box sx = {{marginTop: "64px"}}>
            <NavBar/>
            <ChartGalery/>
            <TransactionGalery/>
        </Box>
    )
}