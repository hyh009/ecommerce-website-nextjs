import {ColorType, PatternType} from "./product";

export interface ICartProduct {
    _id?: string;
    color: ColorType | undefined;
    pattern: PatternType | undefined;
    quantity:number;
}


export interface ICart {
    user:string;
    products:ICartProduct[];
    quantity:number;
}