import {useNavigate} from "react-router-dom";

export default function AddTransactionButton(){
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/add-transaction")}>+</button>
    )
}