import { IProductDocument } from "../models/Product"
import { ICartProduct } from "../types/cart";
import { IOrderProduct, ISavedOrder } from "../types/order";
import { baseUrl } from "../utils/config";
import {v4 as uuid} from "uuid";
import  crypto from "crypto";

export const createOrderProducts = (products:IProductDocument[], cartProducts:ICartProduct[]):Array<IOrderProduct> => {
    const orderProducts = cartProducts.map((product)=>{
        const productInfo = products.find((item)=>item._id===product._id);

        return {
            _id:product._id,
            quantity:product.quantity,
            price:productInfo?.price.current?productInfo?.price.current:productInfo?.price.origin as number,
            color:product.color?product.color.name:undefined,
            pattern:product.pattern?product.pattern.name:undefined
            };
    });
    return orderProducts;
};

export const createLinePackage = (order:ISavedOrder):LinePackageState[] => {
    let packages = [];
    for (let i = 0; i < order.products.length; i++) {
    packages.push({
        id: i + 1,
        amount: order.products[i].quantity * order.products[i].price,
        products: [
        {
            id: order.products[i]._id?._id as string,
            name: `${order.products[i]._id.title} - ${order.products[i].color}${order.products[i].pattern}`,
            imageUrl: order.products[i]._id.imgs[0].src,
            quantity: order.products[i].quantity,
            price: order.products[i].price,
        },
        ],
    })
    }
    //add shipping fee
    packages.push({
        id: order.products.length,
        amount: order.shipping,
        products: [
        {
            id: "0",
            name: "運費",
            imageUrl:
            "https://res.cloudinary.com/dh2splieo/image/upload/v1643035258/shop_website/imgs/24296403_dkqscf.jpg",
            quantity: 1,
            price: order.shipping,
        },
        ],
    });
    return packages;
}

const COMFIRM_URL =
  `${baseUrl}/payment/confirm`;
const CANCEL_URL =
  `${baseUrl}/payment/cancel`;

export const createSignature = (content:any, nonce:string, Uri:string) => {
    const key = process.env.LINEPAY_SECRET;
    const message = key + Uri + JSON.stringify(content) + nonce;
    const hashBase64 = crypto.createHmac('sha256', key as string).update(message).digest("base64");
    return hashBase64;
  }

export const createRequestConfig = (hmacBase64:string, nonce:string) => {
    const configs = {
      headers: {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": process.env.LINEPAY_CHANNEL_ID as string,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": hmacBase64,
      },
    };
    return configs;
  }

export interface LinePackageState {
    id:number;
    amount:number;
    products:Array<{
        id: string;
        name: string;
        quantity: number;
        imageUrl:string;
        price: number;
    }>;
}

export interface LineOrderState {
    amount:number;
    currency:string;
    orderId:string;
    packages:LinePackageState[];
    redirectUrls:{
        confirmUrl:string;
        cancelUrl:string;
    }
}

export const createLineOrder = (order:ISavedOrder):LineOrderState => {
    const linePackage = createLinePackage(order);
    const lineOrder = {
        amount: order.amount + order.shipping,
        currency: "TWD",
        orderId: order._id as string,
        packages: linePackage,
        redirectUrls: {
          confirmUrl: COMFIRM_URL,
          cancelUrl: CANCEL_URL,
        },
    };

    return lineOrder;
}

export const createConfigs = (requestUri:string, lineOrder:LineOrderState)=>{
    const nonce = uuid();
    const hamcBase64 = createSignature(lineOrder, nonce, requestUri);
    const configs = createRequestConfig(hamcBase64, nonce);
    return configs;
}