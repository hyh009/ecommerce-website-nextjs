import Joi from "joi";
import { SignupInputsState,LoginInputsState } from "../types";

// USER SCHEMA
export const signupValidation = (data:SignupInputsState) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
      "string.empty": `請輸入姓名。`,
      "string.min": `姓名最少2個字。`,
      "string.max": `姓名最多20個字。`,
      "any.required": `請輸入姓名。`,
    }),
    username: Joi.string().min(2).max(20).required().messages({
      "string.empty": `請輸入用戶名稱。`,
      "string.min": `用戶名稱最少2個字。`,
      "string.max": `用戶名稱最多20個字。`,
      "any.required": `請輸入用戶名稱。`,
    }),
    email: Joi.string().required().email().messages({
      "string.empty": `請輸入email。`,
      "string.email": `請輸入正確的email格式。`,
      "any.required": `請輸入email。`,
    }),
    gender: Joi.string().allow("").valid("男", "女", "其他", "未設定").messages({
      "any.only": "性別請從「男」、「女」、「其他」擇一或空白。",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": `請輸入密碼。`,
      "string.min": `密碼最少6個字元。`,
      "string.max": `密碼最多20個字元。`,
      "any.required": `請輸入密碼。`,
    }),
    passwordConfirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": "請再次輸入密碼。",
        "any.only": "前後輸入的密碼不相同。",
      }),
    phone: Joi.string(),
    address: Joi.string(),
  });
  return schema.validate(data);
};


export const loginValidation = (data:LoginInputsState) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": `請輸入email。`,
      "string.email": `請輸入正確的email格式。`,
      "any.required": `請輸入email。`,
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": `請輸入密碼。`,
      "string.min": `密碼最少6個字元。`,
      "string.max": `密碼最多20個字元。`,
      "any.required": `請輸入密碼。`,
    }),
  });
  return schema.validate(data);
};



