import mongoose,{Schema, Document} from "mongoose";
import { IProduct } from "../types/product";

export type IProductDocument = IProduct & Document 

const ProductSchema:Schema<IProductDocument> = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    title: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: true,
    },
    desc: {
      type: String,
      minlength: 10,
      maxlength: 150,
      required: true,
    },
    price: {
     origin:{
        type: Number,
        min: 0,
        required: true,
     },
     current:{
         type:Number,
         min:0,
     }
    },
    imgs: {
      type: [
        {
          src: { type: String, required: true },
          desc: { type: String },
        },
      ],
      required: true,
    },
    categories: {
      type: String,
      enum: [
        "隨你PAD吸管",
        "環保無痕窗貼",
        "矽膠小餐墊",
        "蜂巢坐靠墊",
        "不倒翁門擋",
        "矽膠鍋墊",
      ],
      required: true,
    },
    colors: {
      type: [{ name: { type: String }, code: { type: String },inStock:{type:Boolean}}],
      default: [],
    },
    patterns: {
        type: [{ name: { type: String },inStock:{type: Boolean} }],
        default: [],
      },
    notices: {
      type: [String],
      maxlength: 5,
      default: [],
    },
    like: [{
      user: { type: Schema.Types.ObjectId, ref: "User" },
    }],
    imagePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);

