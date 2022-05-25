import React,{useState, useContext} from 'react';
import { InfoContainer, Title, Description } from './styles';
import { Notices, Price, DiscountPrice, ColorSelect, PatternSelect, Quantity } from '../index';
import {Button, ErrorModal, BasicToastr} from "../../Common";
import { useSession } from "next-auth/react";
import { IProduct } from '../../../types/product';
import { ICartProduct } from '../../../types/cart';
import CartContext from '../../../store/cart-context';
import useToastr from "../../../utils/hooks/useToast";
import { checkCart } from '../../../utils/cartAction';


interface Props {
    product:IProduct;
    type?:"modal";
    closeDialog?:()=>void;
}

const ProductInfo:React.FC<Props> = ({product, type, closeDialog}) => {
    const [selectedItem, setSelectedItem] = useState<string>(""); // store selected color or pattern
    const [quantity, setQuantity] = useState<number>(1);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);
    const cartCtx = useContext(CartContext);
    const { data: session } = useSession();
    const showToastr = useToastr();


    const addToCart = () => {
        if(!selectedItem) return setErrorMsg("請選擇樣式"); 
        const newCartItem:ICartProduct = {
            _id:product._id,
            color:product.colors? product.colors.filter((color)=>color.name===selectedItem)[0] : undefined,
            pattern:product.patterns? product.patterns.filter((pattern)=>pattern.name===selectedItem)[0] : undefined,
            quantity
        };
        if(cartCtx.products.length===0){
            // create new cart
            if(!session){
                cartCtx.updateNotLoginCart([newCartItem]);
                showToastr("addToCart");
                if(type==="modal" && closeDialog){
                  closeDialog();
                }
                
              }else{
                cartCtx.updateCart({
                  user:session.user._id,
                  products:[newCartItem],
                  quantity:1
                }, setErrorMsg);
                showToastr("addToCart");
                if(type==="modal" && closeDialog){
                  closeDialog();
                }
              }
           
        }else{
            // combine same products
            const noRepeatProducts = checkCart([...cartCtx.products, newCartItem]);
            if(!session){
                cartCtx.updateNotLoginCart(noRepeatProducts);
                showToastr("addToCart");
                if(type==="modal" && closeDialog){
                  closeDialog();
                }
              }else{
                cartCtx.updateCart({
                  user:session.user._id,
                  products:noRepeatProducts,
                  quantity:noRepeatProducts.length
                }, setErrorMsg);
                showToastr("addToCart");
                if(type==="modal" && closeDialog){
                  closeDialog();
                }
                
              }
        }
    };

    const handleCounter = (mode:"minus"|"plus"):void => {
        if(mode==="minus"){
            setQuantity((prev)=>(prev>1?prev-1:1));
        }else if(mode==="plus"){
            setQuantity((prev)=>(prev<20?prev+1:20))
        }
    }

  return (
    <InfoContainer>
        {
          <BasicToastr/>
        }
        <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
        <Title>{product.title}</Title>
        {
            type!=="modal" && 
              <>
                <Description>{product.desc}</Description>
                <Notices notices={product.notices}/>
              </>
        }
        {
            product.price.current!==product.price.origin ? 
                <DiscountPrice price={product.price.origin} 
                               discountPrice={product.price.current}/>:
                <Price price={product.price.origin}/>         
        }
        {product.colors && product.colors.length>0 && 
            <ColorSelect colors={product.colors} 
                         setSelectedItem={setSelectedItem} 
                         selectedItem={selectedItem}/>}
        {product.patterns && product.patterns.length>0 && 
            <PatternSelect  patterns={product.patterns} 
                            setSelectedItem={setSelectedItem} 
                            selectedItem={selectedItem}/>}
            <Quantity quantity={quantity} 
                      handleCounter={handleCounter}/>
            <Button type="button"
                    clickHandler={addToCart} 
                    content="加入購物車" 
                    backgroundColor="transparent" 
                    color="black" 
                    width="40%"
                    border="2px solid var(--secondaryColor)"/>

    </InfoContainer>
  )
}

export default ProductInfo