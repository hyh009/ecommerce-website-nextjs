import { axiosInstance } from "./config";
import { AxiosResponse } from "axios";
import { IProduct } from "../types/product";
import { Dispatch, SetStateAction } from "react";
import { ICartProduct} from "../types/cart";
import { IProductDocument } from "../models/Product";

// check if product already in the cart
export const checkCart = (allproducts:ICartProduct[]):ICartProduct[] => {
    const record = new Map();
    for(let i=0;i<allproducts.length;i++){  
        if(!(record.has(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`))){
            record.set(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`,allproducts[i]);
        }else{
            let withNewQuantity = record.get(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`);
            let newQuantity = (withNewQuantity.quantity + allproducts[i].quantity)>=20?20:withNewQuantity.quantity+allproducts[i].quantity;
            record.set(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`,
            {...withNewQuantity, quantity: newQuantity}
            );
        }
    }

    return Array.from(record.values());
    
};

