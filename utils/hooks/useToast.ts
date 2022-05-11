import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type showToastrType = (toastName:string)=>void;

const useToast = ():showToastrType => {
    const [toastType, setToastType] = useState<string>("");
    const showToast:showToastrType = (toastName) => {
        setToastType(toastName);
    }

    useEffect(() => {
        let timer:any;
        // add product to cart
        if (toastType === "addToCart") {
          toast.info("成功加入購物車", {
            toastId: "addToCart",
          });
          // create post
        } else if (toastType === "cartDeleted") {
          toast.info("購物車已清空", {
            toastId: "cartDeleted",
          });
          // create order
        } else if (toastType === "orderCreated") {
          toast.info("訂單成立", {
            toastId: "orderCreate",
          });
        } else if (toastType === "userCreated") {
            toast.info("註冊成功！將導向登入頁面", {
              toastId: "userCreated",
            });
        } else if (toastType === "login") {
            toast.info("登入成功！將導入個人頁面", {
              toastId: "login",
            });
          }
        timer = setTimeout(() => setToastType(""), 1500);
        return () => clearTimeout(timer);
      }, [toastType]);

      return showToast;

}

export default useToast;