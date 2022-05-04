import React,{useState} from 'react';
import { InfoContainer, Title, Description } from './styles';
import { Notices, Price, ColorSelect, PatternSelect, Quantity } from '../index';
import {FixedWidthButton} from "../../Common";
import { IProduct } from '../../../types/product';
import { FlexRow } from '../../Wrapper/styles';



interface Props {
    product:IProduct;
}

interface SelectItemState {
    _id:string;
    title:string;
    color:string;
    pattern:string;
    img:string;
    price:number;
    quantity:number;
}

const ProductInfo:React.FC<Props> = ({product}) => {
    const [selectItem, setSelectItem] = useState(""); // store selected color or pattern
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        if(!selectItem || !quantity ) return; // show errormodal
        const newCartItem = {
            _id:product._id,
            title:product.title,
            color:product.colors? product.colors.filter((color)=>color.name===selectItem):"",
            pattern:product.patterns? product.patterns.filter((pattern)=>pattern.name===selectItem):"",
            img:product.imgs[0].src,
            price:product.price.current>0?product.price.current:product.price.origin,
            quantity
        };
        // add to cart logic
    }

  return (
    <InfoContainer>
        <Title>{product.title}</Title>
        <Description>{product.desc}</Description>
        <Notices notices={product.notices}/>
        <Price price={product.price}/>
        {product.colors && product.colors.length>0 && 
            <ColorSelect colors={product.colors} setSelectItem={setSelectItem} selectItem={selectItem}/>}
        {product.patterns && product.patterns.length>0 && 
            <PatternSelect  patterns={product.patterns} setSelectItem={setSelectItem}/>}
        <FlexRow gap="30px">
            <Quantity quantity={quantity} setQuantity={setQuantity}/>
            <FixedWidthButton type="button"
                              clickHandler={addToCart} 
                              content="加入購物車" 
                              backgroundColor="transparent" 
                              color="black" 
                              border="2px solid var(--secondaryColor)"/>
        </FlexRow>
    </InfoContainer>
  )
}

export default ProductInfo