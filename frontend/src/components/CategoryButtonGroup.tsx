import {Box, Card, CardActionArea, CardContent, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import categories from "../types/category";
import {useState} from "react";

export default function CategoryButtonGroup({
    onCategory
}:{
    onCategory: (category:string,sign:string) => void
}) {
    const [clickedIdExp, setClickedIdExp] = useState(-1);
    const [clickedIdIncome, setClickedIdIncome] = useState(-1);

    const handleClickExp = (category:string, id:number) => {
        setClickedIdExp(id);
        setClickedIdIncome(-1);
        onCategory(category, "minus");
    };
    const handleClickIncome = (category:string, id:number) => {
        setClickedIdIncome(id);
        setClickedIdExp(-1);
        onCategory(category,"plus");
    };

    return (
        <Stack gap={2}>
            <Typography>Expenses</Typography>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                {categories.expenses.map((category,index) =>
                    <Card key ={category} sx={{ width:100, height: 100 }}>
                        <CardActionArea onClick={() => handleClickExp(category, index)}>
                            <CardContent>
                                <Typography gutterBottom
                                            variant="body1"
                                            sx={{color: clickedIdExp ===index ? "red":" black"}}
                                >
                                    {category}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            </Box>

            <Typography>Income</Typography>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                {categories.income.map((category,index) =>
                    <Card key ={category} sx={{ width:100, height: 100 }}>
                        <CardActionArea onClick={() => handleClickIncome(category, index)}>
                            <CardContent>
                                <Typography gutterBottom
                                            variant="body1"
                                            sx={{color: clickedIdIncome ===index ? "green":" black"}}
                                >
                                    {category}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            </Box>
        </Stack>
    )
}
