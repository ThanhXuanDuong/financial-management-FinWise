import {Route, Routes} from "react-router-dom";
import SignInPage from "./SignInPage";
import DashboardPage from "./DashboardPage";
import Auth from "../login/Auth";
import NoAuth from "../login/NoAuth";
import SignUpPage from "./SignUpPage";
import HomePage from "./HomePage";

export default function Root(){
    return (
      <>
        <Routes>
            <Route >
                <Route path={"/"} element={<HomePage/>}/>

                <Route path={"/sign-up"} element={
                    <NoAuth>
                        <SignUpPage />
                    </NoAuth>}
                />

                <Route path={"/sign-in"} element={
                    <NoAuth>
                        <SignInPage />
                    </NoAuth>}
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