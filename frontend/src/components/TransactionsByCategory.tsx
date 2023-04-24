import Box from "@mui/material/Box";

export default function TransactionByCategory({category} : {category:string}){
    return (
        <Box display ="flex" justifyContent="space-between">
            <div>{category}</div>
        </Box>
    )
}