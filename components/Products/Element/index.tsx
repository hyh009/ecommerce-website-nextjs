import React, { Dispatch, SetStateAction } from 'react';
import { Notice, NoticeContainer, PriceContainer, NormalPrice, OriginalPrice, CurrentPrice, 
    ColorContainer, FilterColor, IconContainer, Amount, AmountText } from './styles';
import { Dropdown } from '../../Form';
import {PatternType, ColorType} from "../../../types/product";
import {AiOutlinePlus, AiOutlineMinus, AiOutlineClose} from "react-icons/ai";
import { FlexRow } from '../../Wrapper/styles';




interface NoticesProps {
    notices: string[];
}
export const Notices:React.FC<NoticesProps> = ({notices}) => {
  return (
    <NoticeContainer>
        {
            notices.map((notice,index)=><Notice key={index}>{notice}</Notice>)
        }
    </NoticeContainer>
  )
}

interface ColorsProps {
    colors:ColorType[];
    setSelectedItem:Dispatch<SetStateAction<string>>;
    selectedItem:string;
}

export const ColorSelect:React.FC<ColorsProps> = ({colors, setSelectedItem, selectedItem}) => {
    const disable = colors.map((color)=>!color.inStock);
    const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        const selectedDiv = e.target as  HTMLDivElement;
        const selectedColor = selectedDiv.title as string;
        setSelectedItem(selectedColor);
    }

    return (
      <ColorContainer>
         選擇顏色：{
             colors.map((color,index)=>{
                if(disable[index]){
                    return (<FilterColor key={index} 
                              color={color.code} 
                              title={color.name + " (暫無庫存)"}><AiOutlineClose/>
                            </FilterColor>)
                }else{
                    return (<FilterColor key={index} 
                              color={color.code} 
                              title={color.name}
                              className={selectedItem===color.name ? "color_active": ""}
                              onClick={clickHandler} />)
                }
              })
         }
      </ColorContainer>
    )
  }

interface PatternsProps {
    patterns: PatternType[];
    setSelectedItem:Dispatch<SetStateAction<string>>;
    selectedItem: string;
}
export const PatternSelect:React.FC<PatternsProps> = ({patterns, setSelectedItem, selectedItem}) => {
    const options = patterns.map((pattern)=>pattern.name);
    const disable = patterns.map((pattern)=>!pattern.inStock);
    const clickHandler = (e:React.MouseEvent<HTMLDivElement>, setItem:Dispatch<SetStateAction<string>>) => {
        const selectedDiv = e.target as  HTMLDivElement;
        const selectedpattern = selectedDiv.textContent as string;
        setItem(selectedpattern);
    }
    return (
      <Dropdown title={selectedItem?selectedItem:"請選擇樣式"} 
                options={options} 
                disable={disable} 
                clickHandler={clickHandler}
                setItem={setSelectedItem}/>
    )
  }

interface DiscountPriceProps {
    price:number;
    discountPrice?:number;
    size?:"small";
}

export const DiscountPrice:React.FC<DiscountPriceProps> = ({price,discountPrice,size}) => {
    return (
        <PriceContainer>
          <NormalPrice size={size}>NT$ {price}</NormalPrice>
          <CurrentPrice size={size}>NT$ {discountPrice}</CurrentPrice>
        </PriceContainer>
    )
}
interface PriceProps {
    price:number;
    size?:"small";
}
export const Price:React.FC<PriceProps> = ({price,size})=>{
    return (
        <OriginalPrice size={size}>NT$ {price}</OriginalPrice>
    )
}
interface QuantityProps {
    quantity:number
    handleCounter:(mode:"minus"|"plus", id?:string)=>void;
    id?:string;
}
export const Quantity:React.FC<QuantityProps> = ({quantity, handleCounter, id}) => {

    return (
        <FlexRow>
            <AmountText>數量：</AmountText>
            <IconContainer onClick={()=>handleCounter("minus", id)}><AiOutlineMinus/></IconContainer>
            <Amount>{quantity}</Amount>
            <IconContainer onClick={()=>handleCounter("plus", id)}><AiOutlinePlus/></IconContainer>
        </FlexRow>
    )
}
  
  
