import{ ObjectId} from "mongoose";

export type InputTypes = 
    "button" | "checkbox"| "color"| "date"| "datetime-local"| "email"| "file"| "hidden"|
    "image"| "month"|  "number"| "password"| "radio"| "range"| "reset"| "search"| "submit"|
    "tel"| "text"| "time"| "url"| "week"

export interface SignupInputsState {
  name:string;
  gender:string;
  email:string;
  username:string;
  password:string;
  passwordConfirmation:string;
}

export interface LoginInputsState {
  email:string;
  password:string;
}

export interface IUser {
  name:string;
  username:string;
  email: string;
  password: string;
  gender:"男"| "女"| "其他"| "未設定";
  role:"admin" | "user";
  profilePicUrl:string;
  wishList:ObjectId[];
  lank:"普通會員" | "VIP會員";
  coupon:{code:string, expiredDate: Date}[];
  coverColor:string;
  phone:string;
  address:string;
  createdAt?:string;
  updatedAt?:string;
}

export interface UpdateUserState {
  name?:string;
  gender?:"男"|"女"|"其他"|"未設定";
  email?:string;
  address?:string;
  phone?:string;
  coverColor?:string;
}
