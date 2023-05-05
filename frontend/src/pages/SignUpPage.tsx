import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert, AlertTitle} from "@mui/material";
import themeDark from "../themes/themeDark";

export default function SignUpPage() {
    const [credentials, setCredentials] = useState({
        "username": "",
        "password" : ""
    });

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
                await axios.post("/api/app-users", credentials);
                navigate("/login" + location.search);
            }catch (e) {
                setError("Invalid user");
            }
        }, [credentials, location.search, navigate]
    );

    return (
        <ThemeProvider theme={themeDark}>
            <Container component="main"
                       maxWidth="xs"
                       sx={{
                           display:"flex",
                           justifyContent:"center",
                           height:"100vh",
                           background: 'linear-gradient(to bottom, #484E54 0%,#484E54 60%, #20C6BE 60%, #20C6BE 100%)',
                           overflow: 'hidden',
                           position:"relative"
                       }}
            >
                <CssBaseline />
                <Container sx={{position: "absolute", top: "10%"}}>
                    <img
                        width="100%"
                        src="/logo.png"
                        alt="logo"
                    />
                </Container>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: "15%",
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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    value={credentials.username}
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
                                    name="password"
                                    label="password"
                                    type="password"
                                    id="password"
                                    value={credentials.password}
                                    autoComplete="new-password"
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
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href={"/login"} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}