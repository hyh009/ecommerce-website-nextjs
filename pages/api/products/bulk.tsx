import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import Product from "../../../models/Product";

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try{
            const {productIds} = req.body;
            
            await db.connect();

            const products = await Product.find({_id:{$in:productIds}})
            
            await db.disconnect();
            return res.status(201).json(products);

        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;