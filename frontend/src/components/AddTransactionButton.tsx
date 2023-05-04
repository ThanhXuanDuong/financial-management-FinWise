import {useNavigate} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import {Box, Fab} from "@mui/material";

export default function AddTransactionButton(){
    const navigate = useNavigate();

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab size="medium"
                 aria-label="add"
                 onClick={() => navigate("/add-transaction")}
            >
                <AddIcon/>
            </Fab>
        </Box>
    )
}