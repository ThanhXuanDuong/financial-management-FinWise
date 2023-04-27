import CategoryCard from "./CategoryCard";
import {Box, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
export default function Categories({
    onCategory
}:{
    onCategory: (category:string) => void
}) {
    let categories = ["shopping", "internet", "transport"];

    return (
        <Stack gap={2}>
            <Typography>Choose Category: </Typography>
            <Box display="flex" justifyContent="space-between">
                {categories.map(c => <CategoryCard key={c} category={c} onCategory={onCategory}/>)}
            </Box>
        </Stack>
    )
}
