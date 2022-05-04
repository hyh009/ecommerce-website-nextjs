import React, { Dispatch, SetStateAction } from 'react';
import { Notice, NoticeContainer, PriceContainer, NormalPrice, OriginalPrice, CurrentPrice, 
    ColorContainer, FilterColor, IconContainer, Amount, AmountText } from './styles';
import { Dropdown } from '../../Form';
import {PriceType, PatternType, ColorType} from "../../../types/product";
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
    setSelectItem:Dispatch<SetStateAction<string>>;
    selectItem:string;
}

export const ColorSelect:React.FC<ColorsProps> = ({colors, setSelectItem, selectItem}) => {
    const disable = colors.map((color)=>!color.inStock);
    const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        const selectedDiv = e.target as  HTMLDivElement;
        const selectedColor = selectedDiv.title as string;
        setSelectItem(selectedColor);
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
                              className={selectItem===color.name ? "color_active": ""}
                              onClick={clickHandler} />)
                }
              })
         }
      </ColorContainer>
    )
  }

interface PatternsProps {
    patterns: PatternType[];
    setSelectItem:Dispatch<SetStateAction<string>>;
}
export const PatternSelect:React.FC<PatternsProps> = ({patterns, setSelectItem}) => {
    const options = patterns.map((pattern)=>pattern.name);
    const disable = patterns.map((pattern)=>!pattern.inStock);
    const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        const selectedDiv = e.target as  HTMLDivElement;
        const selectedpattern = selectedDiv.textContent as string;
        setSelectItem(selectedpattern);
    }
    return (
      <Dropdown title="請選擇樣式" options={options} disable={disable} clickHandler={clickHandler}/>
    )
  }

interface PriceProps {
    price:PriceType;
}

export const Price:React.FC<PriceProps> = ({price}) => {
      if(price.current>0){
          return (
              <PriceContainer>
                <NormalPrice>NT$ {price.origin}</NormalPrice>
                <CurrentPrice>NT$ {price.origin}</CurrentPrice>
              </PriceContainer>
          )
      }

      return (
          <OriginalPrice>NT$ {price.origin}</OriginalPrice>
      )
  }
interface QuantityProps {
    quantity:number
    setQuantity:Dispatch<SetStateAction<number>>;
}
export const Quantity:React.FC<QuantityProps> = ({quantity, setQuantity}) => {
    const handleCounter = (mode:"minus"|"plus"):void => {
        if(mode==="minus"){
            setQuantity((prev)=>(prev>1?prev-1:1));
        }else if(mode==="plus"){
            setQuantity((prev)=>(prev<20?prev+1:20))
        }
    }

    return (
        <FlexRow>
            <AmountText>數量：</AmountText>
            <IconContainer onClick={()=>handleCounter("minus")}><AiOutlineMinus/></IconContainer>
            <Amount>{quantity}</Amount>
            <IconContainer onClick={()=>handleCounter("plus")}><AiOutlinePlus/></IconContainer>
        </FlexRow>
    )
}
  
  
