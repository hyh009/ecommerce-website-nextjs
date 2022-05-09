import {ICart, ICartProduct} from "../types/cart";

// export interface ICartProduct {
//     _id?: string;
//     color: ColorType | null;
//     pattern: PatternType | null;
//     price: number
//     quantity:number;
// }

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