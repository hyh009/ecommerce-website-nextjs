import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type showToastrType = (toastName:string)=>void;

const useToastr = ():showToastrType => {
    const [toastrType, setToastrType] = useState<string>("");
    const showToastr:showToastrType = (toastName) => {
        setToastrType(toastName);
    }

    useEffect(() => {
        let timer:any;
        // add product to cart
        if (toastrType === "addToCart") {
          toast.info("成功加入購物車", {
            toastId: "addToCart",
          });
          // create post
        } else if (toastrType === "cartDeleted") {
          toast.info("購物車已清空", {
            toastId: "cartDeleted",
          });
          // create order
        } else if (toastrType === "orderCreated") {
          toast.info("訂單成立", {
            toastId: "orderCreate",
          });
        } else if (toastrType === "userCreated") {
            toast.info("註冊成功！將導向登入頁面", {
              toastId: "userCreated",
            });
        } else if (toastrType === "login") {
            toast.info("登入成功！將導入個人頁面", {
              toastId: "login",
            });
          }
        timer = setTimeout(() => setToastrType(""), 1500);
        return () => clearTimeout(timer);
      }, [toastrType]);

      return showToastr;

}

export default useToastr;