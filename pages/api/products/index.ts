import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/react";
import Product from "../../../models/Product"; 
import axios from "axios";


async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="GET"){
        //get product data
       try{
        await db.connect();
        const products = await Product.find({});
        await db.disconnect();
        return res.status(200).json(products);
       }catch(error){
        await db.disconnect();
        if(axios.isAxiosError(error)){          
            return res.status(500).json({message:error.response?.data});
        }
        return res.status(500).json({message:"Server error"});
       }
    }
}

export default handler;