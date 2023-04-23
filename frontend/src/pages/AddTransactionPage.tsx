import TextField from "@mui/material/TextField";
import Categories from "../components/Categories";
import {Stack} from "@mui/material";
import React, {FormEvent, useCallback, useState} from "react";
import Transaction from "../types/Transaction";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function AddTransactionPage(){
    const {user} = useAuth();

    const initial = {
        description: "",
        datum: "",
        amount: 0,
        category: "",
        userId: ""
    }

    const [transaction, setTransaction] = useState<Transaction>(initial);

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setTransaction({...transaction,
                            [e.target.name]: e.target.value,
                            userId: user?.id});
    },[transaction, user]);

    const onCategory = (category: string) =>
        setTransaction({...transaction, category: category});

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
        <> {!user ? null :
            <form onSubmit={onSubmit}>
                <Stack>
                    <TextField type="date"
                               size="small"
                               sx = {{width:"40%",
                                   borderRadius:"5px",
                                   backgroundColor:"secondary.main"}}
                               name="datum"
                               value={transaction.datum}
                               onChange={handleChange}
                    />
                    <TextField type="number"
                               variant="standard"
                               placeholder="0,00"
                               sx={{width:"80%",
                                   "& .MuiInoutBase-root": {
                                       height: 300
                                   },
                                   mb: 2
                               }}
                               name="amount"
                               value={transaction.amount}
                               onChange={handleChange}
                    />
                    <TextField type="text"
                               variant="standard"
                               placeholder="Description"
                               sx={{width:"80%",
                                   "& .MuiInoutBase-root": {
                                       height: 300
                                   },
                                   mb: 2}}
                               name="description"
                               value={transaction.description}
                               onChange={handleChange}
                    />
                </Stack>

                <Categories onCategory={onCategory}/>
                <button>File upload</button>
                <div>Or</div>
                <button>Add</button>
            </form>
        }
        </>

    )
}