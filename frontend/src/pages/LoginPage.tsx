import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import {FormEvent, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {Alert, AlertTitle} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import theme from "../themes/themeDark";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({
        "username": "",
        "password" : ""
    });

    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials,[name]: value})
        },
        [credentials, setCredentials],
    );

    const [error, setError] = useState<string>("");

    const handleSubmit = useCallback(async(event:FormEvent<HTMLFormElement>) =>{
            event.preventDefault();
            setError("");

            try {
                await axios.post("/api/app-users/login", null, {
                    headers:
                        {
                            "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                        }
                });
                navigate(redirect);
            }catch (e) {
                setError("Invalid username oder password");
            }
        }, [credentials,navigate,redirect]
    );

    const handleClick = async() => {
        try {
            await axios.post("/api/app-users/login", null, {
                headers:
                    {
                        "Authorization": "Basic " + window.btoa("user:password")
                    }
            });
            navigate(redirect);
        }catch (e) {
            setError("Error while logging in");
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main"
                       maxWidth="xs"
                       sx={{height:"100vh",
                           background: 'linear-gradient(to bottom, #484E54 0%,#484E54 60%, #20C6BE 60%, #20C6BE 100%)',
                           overflow: 'hidden'
            }}
            >
                <CssBaseline />
                <Container sx={{marginTop: 8}}>
                    <img
                        width="100%"
                        src="/logo.png"
                        alt="logo"
                    />
                </Container>

                <Box
                    sx={{
                        width:"85%",
                        marginX: "auto",
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        boxShadow: 2,
                        borderRadius: 2
                    }}
                >
                    <Typography component="h1" variant="h5" color="secondary.contrastText">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            id="username"
                            label="Username"
                            name="username"
                            value={credentials.username}
                            autoComplete="username"
                            autoFocus
                            sx={{
                                input: {
                                    color: "#000000",
                                    background: "#DEE0E6"
                                },
                                label: {
                                    color: "#000000"
                                },
                                boxShadow: 2,
                                borderRadius: 2
                            }}
                            onChange = {handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={credentials.password}
                            autoComplete="current-password"
                            sx={{
                                input: {
                                    color: "#000000",
                                    background: "#DEE0E6"
                                },
                                label: {
                                    color: "#000000"
                                },
                                boxShadow: 2,
                                borderRadius: 2
                            }}
                            onChange = {handleChange}
                        />
                        {error &&
                            <Alert severity="error" sx={{mb: 2}}>
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                           Login
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{mb: 2 }}
                            onClick={handleClick}
                        >
                            Login with Test Account
                        </Button>

                        <Box display="flex" justifyContent="center">
                            <Link href={"/signup" + location.search} variant="body2">
                                {"Sign Up Here"}
                            </Link>
                        </Box>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}