import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/react";

async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method!=="PATCH"){
        return;
    }

    const session = await getSession({req:req});
    if(!session){
        res.status(401).json({message:"Unauthenticated"});
    }

    // change password logic

}

export default handler;