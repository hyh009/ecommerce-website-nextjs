import Joi from "joi";
import { SignupInputsState,LoginInputsState } from "../types/auth";
import { IProduct } from "../types/product";
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


export const productValidation = (data:IProduct) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
      "string.empty": `請輸入產品名稱。`,
      "string.min": `名稱最少3個字。`,
      "string.max": `名稱最多20個字。`,
      "any.required": "請輸入產品名稱。",
    }),
    title: Joi.string().required().min(5).max(30).messages({
      "string.empty": `請輸入產品顯示標題。`,
      "string.min": `標題最少5個字。`,
      "string.max": `標題最多30個字。`,
      "any.required": "請輸入產品顯示標題。",
    }),
    desc: Joi.string().required().min(10).max(150).messages({
      "string.empty": `請輸入產品描述。`,
      "string.min": `產品描述最少10個字。`,
      "string.max": `產品描述最多150個字。`,
      "any.required": "請輸入產品描述。",
    }),
    price: Joi.object({
      origin:Joi.number().required().min(0).messages({
        "number.empty": `請輸入產品價格。`,
        "number.min": `價格最少0元。`,
        "any.required": "請輸入產品價格。",
      }),
      current:Joi.number().min(0).messages({
        "number.min": `價格最少0元。`,
      }),
    }),
    imgs: Joi.array().items(
      Joi.object({
        desc: Joi.string(),
        src: Joi.string().required().messages({
          "string.empty": "請輸入照片位置。",
          "any.required": "請輸入照片位置。",
        }),
      })
    ),
    categories: Joi.string()
      .required()
      .valid(
        "隨你PAD吸管",
        "環保無痕窗貼",
        "矽膠小餐墊",
        "蜂巢坐靠墊",
        "不倒翁門擋",
        "矽膠鍋墊"
      )
      .messages({
        "any.required": "請輸入正確的商品分類名稱。",
        "any.only": "請輸入正確的商品分類名稱",
      }),
    colors: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        code: Joi.string(),
        inStock:Joi.boolean(),
      })
    ),
    patterns: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        inStock:Joi.boolean(),
      })
    ),
    notices: Joi.array().items(Joi.string()).max(5).messages({
      "array.max":"注意事項最多5項",
    }),
    imagePath: Joi.string().required().messages({
      "string.empty": "請輸入圖片路徑。",
      "any.required": "請填入圖片路徑。",
    }),
  });
  return schema.validate(data);
};

