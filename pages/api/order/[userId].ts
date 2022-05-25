import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import Order from "../../../models/Order";
import { getSession } from "next-auth/react";
import {createOrderProducts} from "../../../utilsServer/helper";


async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try {
            const {userId} = req.query;
            const {products, cartProducts, amount, address, phone, receiver, shipping, payment } = req.body;
            const session = await getSession({req:req});
            if(!session || session.user._id !== userId){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();

            const orderProducts = createOrderProducts(products,cartProducts);
            const newOrder = new Order({
                user:userId,
                products:orderProducts,
                amount,
                address,
                phone,
                receiver,
                shipping,
                payment
            });

            const order = await newOrder.save();
            await db.disconnect();
            return res.status(201).json(order._id);
        } 
        catch (error) {
            console.log(error);
            await db.disconnect();
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
            const orders = await Order.find({user:userId});
            
            await db.disconnect();
            return res.status(201).json(orders);
        } 
        catch (error) {
            console.log(error);
            await db.disconnect();
            return res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;