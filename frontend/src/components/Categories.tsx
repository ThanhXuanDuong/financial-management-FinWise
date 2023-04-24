import CategoryCard from "./CategoryCard";
import {Box} from "@mui/material";

export default function Categories({
    onCategory
}:{
    onCategory: (category:string) => void
}){
    let categories = ["shopping", "internet", "transport"];

    return (
        <Box display="flex" justifyContent="space-between">
            {categories.map(c => <CategoryCard category={c} onCategory={onCategory}/>)}
        </Box>

    )
}