import {AppBar,Toolbar, useMediaQuery, useTheme} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LogoutButton from "./LogoutButton";
import MenuList from "./MenuList";
import SavingsGoalFormDialog from "./SavingsGoalFormDialog";

export default function NavBar({
    title,
    setSavingsGoal
}:{
    title:string,
    setSavingsGoal: (goal: number) => void
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ boxShadow: "none" }}>
                    <Toolbar sx={{backgroundColor:"#484E54", color:"#fffff"}}>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        {matches
                            ? <Box display="flex" gap={2}>
                                <SavingsGoalFormDialog setSavingsGoal={setSavingsGoal}/>
                                <LogoutButton/>
                              </Box>
                            : <MenuList/>}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}