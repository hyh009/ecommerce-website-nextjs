import React,{useState} from 'react';
import { InfoContainer, Title, Description } from './styles';
import { Notices, Price, DiscountPrice, ColorSelect, PatternSelect, Quantity } from '../index';
import {Button, ErrorModal, BasicToastr, ModalToastr} from "../../Common";
import { useSession } from "next-auth/react";
import { IProduct } from '../../../types/product';
import { ICartProduct } from '../../../types/cart';
import { useAppDispatch,useAppSelector } from '../../../store/hooks';
import useToastr from "../../../utils/hooks/useToast";
import {createCart, updateCart, updateNotLoginCart} from "../../../store/reducer/cartReducer";
import { checkCart } from '../../../utils/cartAction';


interface Props {
    product:IProduct;
    type?:"modal"
}

const ProductInfo:React.FC<Props> = ({product, type}) => {
    const [selectedItem, setSelectedItem] = useState<string>(""); // store selected color or pattern
    const [quantity, setQuantity] = useState<number>(1);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state=>state.cart);
    const showToastr = useToastr();


    const addToCart = () => {
        if(!selectedItem) return setErrorMsg("請選擇樣式"); 
        const newCartItem:ICartProduct = {
            _id:product._id,
            color:product.colors? product.colors.filter((color)=>color.name===selectedItem)[0] : undefined,
            pattern:product.patterns? product.patterns.filter((pattern)=>pattern.name===selectedItem)[0] : undefined,
            quantity
        };
        if(cart.products.length===0){
            // create new cart
            if(!session){
                dispatch(updateNotLoginCart({products:[newCartItem]}));
                showToastr("addToCart");
              }else{
                dispatch(createCart({products:[newCartItem], 
                                     user:session.user._id, 
                                     quantity:1}));
                showToastr("addToCart");
              }
           
        }else{
            // combine same products
            const noRepeatProducts = checkCart([...cart.products, newCartItem]);
            if(!session){
                dispatch(updateNotLoginCart({products:noRepeatProducts}));
                showToastr("addToCart");
              }else{
                dispatch(updateCart({products:noRepeatProducts, 
                                     user:session.user._id, 
                                     quantity:noRepeatProducts.length}));
                showToastr("addToCart");
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
          type==="modal"?<ModalToastr/>:<BasicToastr/>
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