const SITE_NAME = "墊一店";

export const PAGE_TITLE = {
    HOME : `矽膠產品專家 | ${SITE_NAME}`,
    ABOUT: `關於我們 | ${SITE_NAME}`,
    PRODUCTS:(category:string)=>category!=="全部商品"?`${category} | 墊一店`:`商品一覽 | 墊一店`,
    PRODUCT : (name:string)=>`${name} | ${SITE_NAME}`,
    SIGNUP: `註冊用戶 | ${SITE_NAME}`,
    LOGIN:  `登入帳號 | ${SITE_NAME}`,
    CONTACT:  `聯繫我們 | ${SITE_NAME}`,
    CART: `我的購物車 | ${SITE_NAME}`,

}

export const PAGE_DESC = {
    HOME:"本網站資訊來源自網路。",
    ABOUT:`我們是來自台灣的液態矽膠製造專家 -
    墊一店。我們擁有30年世界級液態矽膠射出設備的製造經驗，我們所設計出的產品，90%以上為液態矽膠製成。希望透過安全環保又獨特的液態矽膠商品，
    照顧你的生活，照顧環境，讓我們擁有更好的每一天。`,
    PRODUCTS:(category?:string)=>category!=="全部商品"?"":"墊一店商品總覽，在這裡可以查看墊一店的所有商品，包括吸管、窗貼、門擋、靠墊、坐墊等。",
    PRODUCT:(desc:string)=>desc,
    SIGNUP:`歡迎加入墊一店會員。`,
    LOGIN: `登入墊一店會員。`,
    CONTACT:  `填寫表單資訊聯繫我們`,
    CART: `購物車中的商品。`,
}