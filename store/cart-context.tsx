import React, { useState, useCallback,  createContext, ReactNode, Dispatch, SetStateAction } from "react";
import { ICartProduct, ICart } from "../types/cart";
import catchError from "../utils/catchError";
import {axiosInstance} from "../utils/config";


interface Props {
    children:ReactNode;
}

const CartContext = createContext({} as ReturnType<typeof useValue>)

const useValue = () => {
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  const [quantity, setQuantity] = useState<number>(0);

  const getLocalSavedCart = useCallback(async () => {
    const cartString = localStorage.getItem("cart");
      if(cartString){
      const cart = JSON.parse(cartString);
      setProducts(cart.products);
      setQuantity(cart.quantity);
      }
  },[]);

  const updateNotLoginCart = (products:ICartProduct[]) => {
    setProducts(products);
    setQuantity(products.length);
    const cart = {
    products,
    quantity:products.length
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };


  const cleanupNotLoginCart = () => {
    setProducts([]);
    setQuantity(0);
    localStorage.removeItem("cart");
  };

  const getCart = useCallback(async (userId:string) => {
    setIsCartLoading(true);
    const {data:cart} = await axiosInstance.get<ICart>(`/api/cart/user/${userId}`);
    setProducts(cart.products);
    setQuantity(cart.quantity);
    setIsCartLoading(false);
  },[]);

  const updateCart = async (cart:ICart,
    setErrorMsg:Dispatch<SetStateAction<string | null>>) => {
    try{
    setIsCartLoading(true);
    const {data:newCart} = await axiosInstance.patch<ICart>(`/api/cart/user/${cart.user}`,{products:cart.products});
    setProducts(newCart.products);
    setQuantity(newCart.products.length);
    setIsCartLoading(false);
    }
    catch(error){
    setErrorMsg(catchError(error));
    setIsCartLoading(false);
    }
  };

  return {
      products, 
      quantity,
      isCartLoading,
      getLocalSavedCart,
      updateNotLoginCart,
      cleanupNotLoginCart,
      getCart,
      updateCart,
  }
}

export const CartContentProvider:React.FC<Props> = ({children}) => {
  return (
    <CartContext.Provider value={useValue()}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext;