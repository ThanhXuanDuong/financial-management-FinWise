import {AppBar,Toolbar, useMediaQuery, useTheme} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutButton from "./LogoutButton";
import MenuList from "./MenuList";
import {useNavigate} from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ boxShadow: "none" }}>
                    <Toolbar sx={{backgroundColor:"#484E54", color:"#fffff"}}>
                        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                            Overview
                        </Typography>
                        {matches
                            ? <>
                                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                                <LogoutButton/>
                            </>
                            : <MenuList/>}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}