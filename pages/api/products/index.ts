import db from "../../../utilsServer/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from "../../../models/Product"; 
import axios from "axios";
import { IProduct } from "../../../types/product";

const SORT_OPTIONS = {
    asc:{"price.current":1},
    desc:{"price.current":-1},
    newest:{"createdAt":-1}
}


async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="GET"){
        //get product data
       const SIZE = 8;
       const PAGE = parseInt(req.query.page as string);
       const {category, color, sort} = req.query;
       const SORT = req.query.sort?SORT_OPTIONS[sort as "asc"|"desc"|"newest"]:SORT_OPTIONS["newest"];
       let totalProducts=0; 
       let products:IProduct[]=[];
       let mongooseQuery = {};
       try{
        await db.connect();
        // condition
        if(category && color){
            const colorPattern = new RegExp(`${color}`);
            mongooseQuery = {categories:category,
                $or:[ {"colors.name":{$regex:colorPattern}},{"patterns.name":{$regex:colorPattern}}] }
        }else if(category){
            mongooseQuery = {categories:category}
        }else if(color){
            const colorPattern = new RegExp(`${color}`);
            mongooseQuery = {$or:[ {"colors.name":{$regex:colorPattern}},{"patterns.name":{$regex:colorPattern}}]}
        }else{
            mongooseQuery={};
        }

        // get the data
        if(PAGE){
            if(PAGE===1){
                products = await Product.find(mongooseQuery)
                                        .sort(SORT)
                                        .limit(SIZE);
            }else{
                products = await Product.find(mongooseQuery)
                                        .sort(SORT)
                                        .skip((PAGE-1)*SIZE)
                                        .limit(SIZE);
            }
            totalProducts = await Product.find(mongooseQuery)
                                         .countDocuments();
            await db.disconnect();
            return res.status(200).json({
                products:products,
                maxPage:Math.ceil(totalProducts/SIZE),
                currentPage: PAGE
            });
        }else{
            // get all data
            products = await Product.find(mongooseQuery).sort({"createdAt":-1});
            await db.disconnect();
            return res.status(200).json(products);
        }
       
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