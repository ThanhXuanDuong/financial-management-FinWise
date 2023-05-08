import {AppBar,Toolbar, useMediaQuery, useTheme} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LogoutButton from "./LogoutButton";
import MenuList from "./MenuList";
import SavingsGoalButton from "./SavingsGoalButton";

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
                <AppBar sx={{ boxShadow: "none" }}>
                    <Toolbar sx={{backgroundColor:"#484E54", color:"#fffff"}}>
                        {matches
                            ? <Box width="100%" display="flex" justifyContent="space-between">
                                <SavingsGoalButton setSavingsGoal={setSavingsGoal}/>
                                <LogoutButton/>
                              </Box>
                            :
                            <>
                                <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                                    {title}
                                </Typography>
                                <MenuList setSavingsGoal={setSavingsGoal}/>
                            </>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}