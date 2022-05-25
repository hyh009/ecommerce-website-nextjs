import type { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/react";
import User, { IUserDocument } from "../../../../models/User";
import db from "../../../../utilsServer/dbConnect";
import axios from 'axios';

const updateDoc = (doc:IUserDocument, newData:any, colname:"name"|"gender"|"email"|"address"|"phone"|"coverColor")=>{
    if(newData){
        doc[colname] = newData;
    }
    return doc;
}

async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="GET"){
        const {userId} = req.query;
       try{
            const session = await getSession({req});
            if(!session || userId !== session.user._id){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const user = await User.findById(userId).select("-password -__v");
            if(!user){
                return res.status(404).json({message:"User not found"});
            }
            await db.disconnect();
            return res.status(200).json(user);
       }catch(error){
        await db.disconnect();
        if(axios.isAxiosError(error)){     
            console.log(error);   
            return res.status(500).json({message:error.response?.data});
        }
        return res.status(500).json({message:"Server error"});
       }
    }
    if(req.method==="PATCH"){
        const {userId} = req.query;
        try{
            const {name, gender, email, address, phone, coverColor} = req.body;
            const session = await getSession({req});
            if(!session || userId !== session.user._id){
                return res.status(401).json({message:"Not authentication"});
            }
            await db.connect();
            const user = await User.findById(userId);
            if(!user){
                await db.disconnect();
                return res.status(404).json({message:"User not found"});
            }
            updateDoc(user, name, "name");
            updateDoc(user, gender, "gender");
            updateDoc(user, email, "email");
            updateDoc(user, address, "address");
            updateDoc(user, phone, "phone");
            updateDoc(user, coverColor, "coverColor");
            await user.save();
            await db.disconnect();
            return res.status(201).json(user);
        }catch(error){
            console.log(error);
            await db.disconnect();
            if(axios.isAxiosError(error)){     
                console.log(error);   
                return res.status(500).json({message:error.response?.data});
            }
            return res.status(500).json({message:"Server error"});
        }
    }
}

export default handler;