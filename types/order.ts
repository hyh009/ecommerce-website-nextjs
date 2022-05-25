import {ObjectId} from "mongoose";
import { ColorType, PatternType, ProductImgType } from "./product";

export interface IOrderProduct {
    _id?:string|ObjectId;
    color?:String;
    pattern?:String;
    quantity:number;
    price:number;
}

export interface ISavedOrderProducts {
    _id:{
        _id:string|ObjectId;
        title:string;
        imgs:ProductImgType[];
    };
    color?:ColorType;
    pattern?:PatternType;
    quantity:number;
    price:number;
};

export interface IPayment {
    method:"linepay"|"creditCard";
    status:"待付款"| "已付款"|"付款失敗"| "已退款"| "已取消";
    transactionId?:string;
}

export interface IOrder {
    user:string|ObjectId;
    products:IOrderProduct[];
    amount:number;
    address:string;
    phone:string;
    receiver:string;
    status:"待付款"|"訂單處理中"|"商品已寄出"|"商品已送達"|"訂單取消"|"訂單退款";
    shipping:number;
    payment:IPayment;

}

export interface ISavedOrder {
    _id?:string|ObjectId;
    user:string|ObjectId;
    products:ISavedOrderProducts[];
    amount:number;
    address:string;
    phone:string;
    recevier:string;
    status:"待付款"|"訂單處理中"|"商品已寄出"|"商品已送達"|"訂單取消"|"訂單退款";
    shipping:number;
    payment:IPayment;
}