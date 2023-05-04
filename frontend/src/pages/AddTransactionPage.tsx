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
import CsvUpload from "../components/CsvUpload";
import Typography from "@mui/material/Typography";

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

    const onCategory = (category: string, sign: string) =>{
        if (!category) return;
        const amount = sign === "minus"
            ? (-parseFloat(transaction.amount)).toString()
            : parseFloat(transaction.amount).toString();
        setTransaction({...transaction,
                            category: category,
                            amount: amount
        });
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
                <ArrowBackIosIcon sx={{color:'primary.contrastText'}}/>
            </IconButton>
            {!user ? null :
            <form onSubmit={onSubmit}>
                <Container>
                    <Stack gap={2} mb={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <TextField type="date"
                                       size="small"
                                       variant="standard"
                                       sx = {{width:"40%",
                                           borderRadius:"5px",
                                           input: { color: 'primary.contrastText' }
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
                                   sx={{ input: { color: 'primary.contrastText' } }}
                                   value={transaction.description}
                                   onChange={handleChange}
                        />

                        <CategoryButtonGroup onCategory={onCategory}/>
                    </Stack>

                    <Container>
                        <Button type="submit" fullWidth variant="contained">Add</Button>
                    </Container>
                </Container>
            </form>
        }
            <Container>
                <Box display="flex" justifyContent="center" margin={2}>
                    <Typography sx={{color: 'primary.contrastText'}}>Or</Typography>
                </Box>
                <CsvUpload/>
            </Container>
        </>

    )
}