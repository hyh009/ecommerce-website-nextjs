import db from "../../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import Order from "../../../../models/Order";
import { getSession } from "next-auth/react";
import {createLineOrder, createConfigs} from "../../../../utilsServer/helper";
import axios from "axios";

const linePayBaseUrl = "https://sandbox-api-pay.line.me";
const requestUri = "/v3/payments/request";

async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try {
            const {userId} = req.query;
            const {orderId} = req.body;
            if(!orderId){
                return res.status(404).json({message:"OrderId not found"});
            }
            const session = await getSession({req:req});
            if(!session || session.user._id !== userId){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const order = await Order.findById(orderId).populate("products._id", ["title", "imgs"]);
            if(!order){
                return res.status(404).json({message:"OrderId not found"})
            }
            const lineOrder = createLineOrder(order);
            const configs = createConfigs(requestUri, lineOrder);
            const response = await axios.post(
                `${linePayBaseUrl}${requestUri}`,
                lineOrder,
                configs
            );
            res.status(200).json({
                paymentUrl: response.data.info.paymentUrl.web,
                paymentUrlApp: response.data.info.paymentUrl.app,
            });

            await db.disconnect();
            return res.status(201);
        } 
        catch (error) {
            console.log(error);
            await db.disconnect();
            return res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;