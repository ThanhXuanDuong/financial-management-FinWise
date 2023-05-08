import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {ChangeEvent, useState} from "react";
import axios from "axios";

export default function SavingsGoalFormDialog({
    setSavingsGoal
}:{
    setSavingsGoal: (goal: number) => void
}) {
    const [open, setOpen] = React.useState(false);
    const [savingRequestBody, setSavingRequestBody] = useState({goal: 0})
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSavingsGoal(parseFloat(e.target.value));
        setSavingRequestBody({goal: parseFloat(e.target.value)})
    }

    const handleSubmit = () => {
        (async () => {
            try{
                await axios.post("/api/saving",savingRequestBody);
            }catch(e){
                alert("Error while loading data");
            }
        })();
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Savings Goal
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Setting</DialogTitle>
                <DialogContent>
                    <DialogContentText marginY={2}>
                        Your savings goal:
                    </DialogContentText>
                    <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                            autoFocus
                            id="goal"
                            type="number"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <Typography sx={{fontSize:"1.5rem"}}>/Month</Typography>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Set</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}