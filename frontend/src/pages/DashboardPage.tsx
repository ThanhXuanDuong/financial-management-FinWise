import NavBar from "../components/NavBar";
import ChartGallery from "../components/ChartGallery";
import TransactionGalery from "../components/TransactionGallery";
import Box from "@mui/material/Box";
import useAuth from "../hooks/useAuth";

export default function DashboardPage(){
    const {user} = useAuth();

    return (
        <>
            { user &&
            <Box sx = {{marginTop: "64px"}}>
                <NavBar/>
                <ChartGallery/>
                <TransactionGalery userId ={user.id}/>
            </Box>}
        </>
    )
}