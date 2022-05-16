import { axiosInstance } from "./config";
import { AxiosResponse } from "axios";
import { IProduct } from "../types/product";
import { Dispatch, SetStateAction } from "react";
import { ICartProduct} from "../types/cart";

// check if product already in the cart
export const checkCart = (allproducts:ICartProduct[]):ICartProduct[] => {
    const record = new Map();
    for(let i=0;i<allproducts.length;i++){  
        if(!(record.has(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`))){
            record.set(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`,allproducts[i]);
        }else{
            let withNewQuantity = record.get(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`);
            record.set(`${allproducts[i]?.color?.name}${allproducts[i]?.pattern?.name}`,
            {...withNewQuantity, quantity: withNewQuantity.quantity + allproducts[i].quantity}
            );
        }
    }

    return Array.from(record.values());
    
};

export const getCartProductsInfo = async (ids:Set<string>, 
                                          setIsLoading:Dispatch<SetStateAction<boolean>>, 
                                          setProducts:Dispatch<SetStateAction<IProduct[]>>, 
                                          controller:AbortController):Promise<void> => {
    setIsLoading(true);
    const promises = [];
    for (const id of ids){
        promises.push(await axiosInstance.get(`/api/products/${id}`,{signal:controller.signal}));
    }

    const results:AxiosResponse<IProduct>[] = await Promise.all(promises);
    setProducts(()=>results.map((result)=>result.data));
    setIsLoading(false);
};