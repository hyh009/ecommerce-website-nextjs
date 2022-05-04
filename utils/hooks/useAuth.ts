import {useState,useEffect} from "react";
import { getSession } from 'next-auth/react';
import {useRouter} from "next/router";
const useAuth = ():boolean => {
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();
    useEffect(()=>{
        getSession().then(session=>{
            if(session){
                router.replace("/");
            }else {
                setAuthLoading(false);
            }
        })
    },[router])

    return authLoading;
}

export default useAuth;