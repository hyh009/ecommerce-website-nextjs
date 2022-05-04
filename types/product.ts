export type ProductImgType = {
    desc:string,
    src:string,
    _id:string,
}

export type CategoriesType = 
    "隨你PAD吸管" | "環保無痕窗貼" | "矽膠小餐墊" |  
    "蜂巢坐靠墊" | "不倒翁門擋"|  "矽膠鍋墊";


export type ColorType = {
    name:string,
    code:string,
    inStock:boolean,
    _id?:string,
}

export type PatternType = {
    name:string,
    inStock:boolean,
    _id?:string,
}

export type LiekType = {
    user:string,
}

export type PriceType = {   
   origin:number,
   current:number,
}


export interface IProduct {
    _id?:string,
    name:string,
    title:string,
    desc:string,
    price:PriceType,
    imgs:ProductImgType[],
    categories:CategoriesType,
    colors?:ColorType[],
    patterns?:PatternType[],
    like:LiekType[],
    notices:string[],
    imagePath:string,
}