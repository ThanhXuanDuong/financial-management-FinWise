import CategoryCard from "./CategoryCard";
import {Box, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import categories from "../types/category";
export default function Categories({
    onCategory
}:{
    onCategory: (category:string) => void
}) {

    return (
        <Stack gap={2}>
            <Typography>Expenses</Typography>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                {categories.expenses.map(c => <CategoryCard key={c} category={c} onCategory={onCategory}/>)}
            </Box>
            <Typography>Income</Typography>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                {categories.income.map(c => <CategoryCard key={c} category={c} onCategory={onCategory}/>)}
            </Box>
        </Stack>
    )
}
