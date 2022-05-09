import mongoose,{Schema, Document} from "mongoose";
import {ICart} from "../types/cart";


export type ICartDocument = ICart & Document 

const CartSchema:Schema<ICartDocument> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        color: {
            name: { type: String },
            code: { type: String },
        },
        pattern: {
            name: { type: String },
        },
        quantity: {
          type: Number,
        },
      },
    ],
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICartDocument>("Cart", CartSchema);