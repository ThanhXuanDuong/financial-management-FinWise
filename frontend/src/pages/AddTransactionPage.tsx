import TextField from "@mui/material/TextField";
import CategoryButtonGroup from "../components/CategoryButtonGroup";
import {IconButton, Stack} from "@mui/material";
import React, {FormEvent, useCallback, useState} from "react";
import Transaction from "../types/Transaction";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./AddTransactionPage.css"

export default function AddTransactionPage(){
    const {user} = useAuth();
    const navigate = useNavigate();
    let currDate = new Date();
    let date = currDate.toISOString().substring(0,10);

    const initial = {
        description: "",
        datum: date,
        amount: "",
        category: "",
        userId: ""
    }

    const [transaction, setTransaction] = useState<Transaction>(initial);

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setTransaction({...transaction,
                            [e.target.name]:e.target.value,
                            userId: user?.id});
    },[transaction, user]);

    const onCategory = (category: string) =>{
        if (!category) return;

        setTransaction({...transaction, category: category});
    }


    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () =>{
            try{
                await axios.post("/api/transactions",transaction);
                setTransaction(initial);
            }catch(e) {
                console.log(e);
            }
        })();
    };

    return (
        <>
            <IconButton onClick={() => navigate("/dashboard")}>
                <ArrowBackIosIcon/>
            </IconButton>
            {!user ? null :
            <form onSubmit={onSubmit}>
                <Container>
                    <Stack gap={5} mb={5}>
                        <Box display="flex" justifyContent="flex-end">
                            <TextField type="date"
                                       size="small"
                                       sx = {{width:"40%",
                                           borderRadius:"5px",
                                           backgroundColor:"secondary.main",
                                       }}
                                       name="datum"
                                       value={transaction.datum}
                                       onChange={handleChange}
                            />
                        </Box>

                        <input type="number"
                               className="amount-input"
                               placeholder="0.00"
                               autoFocus= {false}
                               name="amount"
                               value={transaction.amount}
                               onChange={handleChange}/>

                        <TextField type="text"
                                   variant="standard"
                                   placeholder="Description"
                                   fullWidth
                                   name="description"
                                   value={transaction.description}
                                   onChange={handleChange}
                        />

                        <CategoryButtonGroup onCategory={onCategory}/>
                    </Stack>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined">Csv upload</Button>
                        <Button type="submit" variant="outlined">Add</Button>
                    </Box>
                </Container>

            </form>
        }
        </>

    )
}