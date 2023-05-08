import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';
import {FormEvent, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {Alert, AlertTitle, useMediaQuery, useTheme} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import themeDark from "../themes/themeDark";
import Grid from "@mui/material/Grid";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({
        "username": "",
        "password": ""
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
            setCredentials({...credentials, [name]: value})
        },
        [credentials, setCredentials],
    );

    const [error, setError] = useState<string>("");

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
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
            } catch (e) {
                setError("Invalid username oder password");
            }
        }, [credentials, navigate, redirect]
    );

    const handleClick = async () => {
        try {
            await axios.post("/api/app-users/login", null, {
                headers:
                    {
                        "Authorization": "Basic " + window.btoa("user:password")
                    }
            });
            navigate(redirect);
        } catch (e) {
            setError("Error while logging in");
        }
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <ThemeProvider theme={themeDark}>
            <CssBaseline/>
            <Box height="100vh"
                 display="flex"
                 sx={{
                     background: matches
                         ? 'linear-gradient(to right, #484E54 0%,#484E54 50%, #20C6BE 50%, #20C6BE 100%)'
                         : 'linear-gradient(to bottom, #484E54 0%,#484E54 60%, #20C6BE 60%, #20C6BE 100%)'
                 }}>
                <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignSelf="center">
                        <img
                            width="100%"
                            src="/logo.png"
                            alt="logo"
                        />

                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} alignSelf="center">
                        <Box
                            sx={{
                                bottom: "15%",
                                width: matches ? "50%" : "85%",
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
                            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            id="username"
                                            label="username"
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
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            name="password"
                                            label="password"
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
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
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
                                    sx={{mt: 3}}
                                >
                                    Login
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{mt: 2, mb: 2}}
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
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}