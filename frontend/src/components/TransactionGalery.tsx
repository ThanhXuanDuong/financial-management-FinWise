
import TransactionList from "./TransactionList";
import AddTransactionButton from "./AddTransactionButton";
import Filter from "./Filter";
import Container from "@mui/material/Container";

export default function TransactionGalery(){
    return (
        <Container sx ={{backgroundColor: "primary.main"}}>
            <Filter/>
            <AddTransactionButton/>
            <TransactionList/>
        </Container>

    )
}