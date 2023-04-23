import {useEffect, useState} from "react";
import axios from "axios";

export default function useAuth(){
    const [user, setUser] = useState<{id:string}|null>(null);
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

    return {user, isLoading};
}