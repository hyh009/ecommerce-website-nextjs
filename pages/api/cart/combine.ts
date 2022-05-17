import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import Cart from "../../../models/Cart";
import { getSession } from "next-auth/react";
import {checkCart} from "../../../utils/cartAction";

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try{
            const {email, localCartProduct} = req.body;
            const session = await getSession({req:req});
            if(!session || session.user.email !== email){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const userCart = await Cart.findOne({user:session.user._id});
            const allCartProducts = [...userCart.products,...localCartProduct];
            const newCartProducts = checkCart(allCartProducts);
            userCart.products = newCartProducts;
            userCart.quantity = newCartProducts.length;
            await userCart.save();
            await db.disconnect();
            return res.status(201).json({
                user:session.user._id,
                products:newCartProducts,
                quantity:newCartProducts.length
            });

        }catch(error){
            console.log(error);
            return res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;