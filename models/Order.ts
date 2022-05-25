import mongoose,{Schema, Document} from "mongoose";
import { IOrder } from "../types/order";

export type IOrderDocument = IOrder & Document 

const OrderSchema:Schema<IOrderDocument> = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          color: {
            type: String,
          },
          pattern: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
          price: {
            type: Number,
          },
        },
      ],
      amount: { type: Number, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      receiver: { type: String, required: true },
      status: {
        type: String,
        enum: [
          "待付款",
          "訂單處理中",
          "商品已寄出",
          "商品已送達",
          "訂單取消",
          "訂單退款",
        ],
        default: "待付款",
      },
      shipping: { type: Number, required: true },
      payment: {
        method: { type: String, enum: ["linepay", "creditcard"] },
        status: {
          type: String,
          enum: ["待付款", "已付款", "付款失敗", "已退款", "已取消"],
          default: "待付款",
        },
        transactionId: { type: String },
      },
    },
    { timestamps: true }
  );


  export default mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);