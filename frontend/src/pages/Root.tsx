import {Route, Routes, useSearchParams} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import Auth from "../login/Auth";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";
import {useMemo} from "react";
import NoAuth from "../login/NoAuth";
import { ThemeProvider } from "@emotion/react";
import {CssBaseline} from "@mui/material";
import theme from "../themes/theme";
import AddTransactionPage from "./AddTransactionPage";

export default function Root(){
    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route >
                    <Route path={"/"} element={<HomePage/>}/>

                    <Route path={"/signup"} element={
                        <NoAuth redirect={redirect}>
                            <SignUpPage />
                        </NoAuth>
                     }
                    />

                    <Route path={"/login"} element={
                        <NoAuth redirect={redirect}>
                            <LoginPage />
                        </NoAuth>
                        }
                    />

                    <Route path={"/dashboard"} element={
                        <Auth>
                            <DashboardPage />
                        </Auth>
                    }/>

                    <Route path={"/add-transaction"} element={
                        <Auth>
                            <AddTransactionPage />
                        </Auth>
                    }/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}