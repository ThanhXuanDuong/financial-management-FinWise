import {Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import Auth from "../login/Auth";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";

export default function Root(){
    return (
      <>
        <Routes>
            <Route >
                <Route path={"/"} element={<HomePage/>}/>

                <Route path={"/signup"} element={
                        <SignUpPage />
                 }
                />

                <Route path={"/login"} element={
                        <LoginPage />
                    }
                />

                <Route path={"/dashboard"} element={
                    <Auth>
                        <DashboardPage />
                    </Auth>
                }/>
            </Route>
        </Routes>
      </>
    )
}