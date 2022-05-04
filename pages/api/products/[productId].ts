import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/react";
import Product from "../../../models/Product"; 
import axios from "axios";


async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="GET"){
        //get product data
       const { productId } = req.query;
       try{
        await db.connect();
        const product = await Product.findById(productId);
        await db.disconnect();
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json(product);
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