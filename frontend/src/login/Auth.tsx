import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import axios from "axios";

export default function Auth({
    children
}: {
    children: React.ReactNode
}){
   const location = useLocation();

   const [user, setUser] = useState<{username:string}|null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect( () => {
       (async() => {
           try {
               const user = await axios.get("/api/app-users/me");
               setUser(user.data);
           } catch (e) {
           } finally {
               setIsLoading(false);
           }
       })();
       },[]);

    return ( isLoading ? null:
        <>
            {!user
            ? (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
            />)
            : children}
        </>
    )
}