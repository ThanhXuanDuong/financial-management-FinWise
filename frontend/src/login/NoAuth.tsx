import React from "react";
import {Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NoAuth({
    children,
    redirect
}: {
    children: React.ReactNode,
    redirect: string | null,
}){
    const {user, isLoading} = useAuth();

    return ( isLoading ? null:
            <>
                {user
                    ? (redirect && <Navigate to={redirect}/>)
                    : children}
            </>
    )
}