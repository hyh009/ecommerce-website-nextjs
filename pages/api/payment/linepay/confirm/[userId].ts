import db from "../../../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import Order from "../../../../../models/Order";
import Cart from "../../../../../models/Cart";
import { getSession } from "next-auth/react";
import {v4 as uuid} from "uuid";
import { createSignature, createRequestConfig } from "../../../../../utilsServer/helper";
import axios from "axios";

const linePayBaseUrl = "https://sandbox-api-pay.line.me";


async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==="POST"){
        try {
            const {userId} = req.query;
            const {orderId, transactionId} = req.body;
            const session = await getSession({req:req});
            if(!session || session.user._id !== userId){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const order = await Order.findById(orderId);
            if(order.payment.transactionId){
                if(order.status==="訂單取消"){
                    return res.status(200).json({ success:false, message:"付款失敗" });
                }else{
                    return res.status(200).json({ success:true, message:"付款成功" });
                }
            }
            const amountAndCurrency = {
                amount: order.amount + order.shipping,
                currency: "TWD",
              };
            const nonce = uuid();
            const confirmUri = `/v3/payments/${transactionId}/confirm`;
            const hamcBase64 = createSignature(amountAndCurrency, nonce, confirmUri);
            const configs = createRequestConfig(hamcBase64, nonce);

            const response = await axios.post(
                `${linePayBaseUrl}${confirmUri}`,
                amountAndCurrency,
                configs
            );
            console.log(response.data.returnCode,"Here");
             // update order
            // 0000 => payment approved
            if (response.data.returnCode === "0000") {
                // update order 
                order.status = "訂單處理中";
                order.payment.status = "已付款";
                order.payment.transactionId = transactionId;
                await order.save();
                // clear cart
                const cart = await Cart.findOne({user:userId});
                cart.products=[];
                cart.quantity=0;
                await cart.save();
                await db.disconnect();
                return res.status(200).json({ success: true, message: "付款成功" });
            }else if(response.data.returnCode==="1172"){
                return res.status(500).json({success:false, message:"系統發生問題，請聯繫客服人員。"});
            }else if (response.data.returnCode==="1198"){
                return res.status(200).json({loading:true, message:"正在處理請求…"})
            }
            else {
                order.status = "訂單取消";
                order.payment.status = "付款失敗";
                order.payment.transactionId = transactionId;
                await order.save();
                await db.disconnect();
                return res.status(200).json({ success:false, message:"付款失敗" });
            } 
        } 
        catch (error) {
            console.log(error);
            await db.disconnect();
            return res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;