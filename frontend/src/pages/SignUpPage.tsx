import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {Alert, AlertTitle} from "@mui/material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
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
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={credentials.password}
                                    autoComplete="new-password"
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
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={"/login"} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}