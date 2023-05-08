import axios from "axios";
import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function  LogoutButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(
        async () => {
            await axios.get("/api/app-users/logout");
            navigate("/login?redirect=" + encodeURIComponent(location.pathname + location.search));
            window.document.cookie = "";
            window.localStorage.clear();
            },
        [location,navigate]
    );

    return(
        <Button size="small" onClick={logout}>Logout</Button>
    )
}