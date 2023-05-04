import {Box, ButtonBase, Stack} from "@mui/material";
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
            <Typography sx={{color: "primary.contrastText"}}>Expenses</Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                {categories.expenses.map((category,index) =>
                    <Box key ={category.name}
                         display="flex"
                         justifyContent="center"
                         sx={{ width:100, height: 100, bgcolor:"white",borderRadius:5 }}>
                        <ButtonBase onClick={() => handleClickExp(category.name, index)}>
                            <Stack>
                                <Box display="flex" justifyContent="center">
                                    <img
                                    height="50%"
                                    width="50%"
                                    src={category.url}
                                    alt={category.name}
                                    />
                                </Box>
                                <Typography gutterBottom
                                            variant="body2"
                                            sx={{color: clickedIdExp ===index ? "red":" black"}}
                                >
                                    {category.name}
                                </Typography>
                            </Stack>
                        </ButtonBase>
                    </Box>
                )}
            </Box>

            <Typography sx={{color: "primary.contrastText"}}>Income</Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                {categories.income.map((category,index) =>
                    <Box key ={category.name}
                         display="flex"
                         justifyContent="center"
                         sx={{ width:100, height: 100, bgcolor:"white", borderRadius:5}}>
                        <ButtonBase onClick={() => handleClickIncome(category.name, index)}>
                            <Stack>
                                <img
                                    height="50%"
                                    width="50p%"
                                    src={category.url}
                                    alt={category.name}
                                />
                                <Typography gutterBottom
                                            variant="body2"
                                            sx={{color: clickedIdIncome ===index ? "green":" black"}}
                                >
                                    {category.name}
                                </Typography>
                            </Stack>
                        </ButtonBase>
                    </Box>
                )}
            </Box>
        </Stack>
    )
}
