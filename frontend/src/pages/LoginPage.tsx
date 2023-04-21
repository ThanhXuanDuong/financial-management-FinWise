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
import {FormEvent, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {Alert, AlertTitle} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={credentials.username}
                            autoComplete="username"
                            autoFocus
                            onChange = {handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={credentials.password}
                            autoComplete="current-password"
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={"/signup" + location.search} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}