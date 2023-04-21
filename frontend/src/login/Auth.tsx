import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Auth({
    children
}: {
    children: React.ReactNode
}){
   const location = useLocation();

   const {user, isLoading} = useAuth();

    return ( isLoading ? null:
        <>
            {!user
            ? (<Navigate
                    to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
                />)
            : children}
        </>
    )
}