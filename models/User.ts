import mongoose,{Schema, Document} from "mongoose";
import bcrypt from "bcrypt";
import {IUser} from "../types/auth"


export interface IUserDocument extends IUser,Document { 
  comparePassword(inputPassword: string): Promise<boolean>;
}

const UserSchema:Schema<IUserDocument> = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    username: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
      required: true,
    },
    gender: {
      type: String,
      enum: ["男", "女", "其他", "未設定"],
      default: "未設定",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePicUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dh2splieo/image/upload/v1642260982/shop_website/user/defaultUser_z2hlsg.png",
    },
    wishList: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
      }],
      default: [],
    },
    lank: {
      type: String,
      enum: [
        "VIP會員",
        "普通會員",
      ],
      default: "普通會員",
    },
    coupon: {
      type: [{ code: {type:String} , expiredDate: {type: Date } }],
      default:[]
    },
    coverColor: {
      type: String,
      default: "#eee3d4",
    },
    phone: {
      type: String,
      select:false,
    },
    address: {
      type: String,
      select:false,
    }
  },
  { timestamps: true }
);


UserSchema.pre<IUserDocument>("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) throw err;
    user.password = hash;
    next();
  });
});


UserSchema.methods.comparePassword = async function (inputPassword:string):Promise<boolean>{
  const isMatch = await bcrypt.compare(inputPassword,this.password);
  return isMatch;
};

export default mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

