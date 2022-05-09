import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import Cart from "../../../models/Cart";
import { getSession } from "next-auth/react";

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try {
            const {userId} = req.query;
            const session = await getSession({req:req});
            if(!session || session.user._id !== userId){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const userCart = await Cart.findOne({user:userId});
            if(userCart){
                return res.status(400).json({message:"Cart was created"})
            }
            const newCart = new Cart(req.body);
            await newCart.save();
            await db.disconnect();
            return res.status(201).json(newCart);
        } 
        catch (error) {
            return res.status(500).json({message:"Server error"});
        }
    }
    if(req.method==="GET"){
        try {
            const {userId} = req.query;
            const session = await getSession({req});
            if(!session || session.user._id !== userId){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const cart = await Cart.findOne({user:userId});
            if(!cart){
                return res.status(404).json({message:"Cart not found"});
            }
            console.log(cart);
            await db.disconnect();
            return res.status(201).json(cart);
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({message:"Server error"});
        }
    }
    if(req.method==="PATCH"){
        try {
            const {userId} = req.query;
            const session = await getSession({req});
            if(!session || session.user._id !== userId){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const cart = await Cart.findOne({user:userId});
            if(!cart){
                return res.status(404).json({message:"Cart not found"});
            }
            cart.products = req.body.products;
            cart.quantity = req.body.quantity;

            await cart.save();
            await db.disconnect();
            return res.status(201).json(cart);
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({message:"Server error"});
        }
    }

}

export default handler;