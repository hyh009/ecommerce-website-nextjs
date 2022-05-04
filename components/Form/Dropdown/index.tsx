import React,{useState, useRef} from 'react';
import {Container, Button, MenuContainer, Option} from "./styles";
import { FlexRow } from '../../Wrapper/styles';
import useClickOutsideClose from "../../../utils/hooks/useClickOutsideClose"


interface DropdownProps {
    title:string;
    options:string[];
    clickHandler:(e:React.MouseEvent<HTMLDivElement>)=>void;
    disable?:boolean[];

}
const Dropdown:React.FC<DropdownProps> = ({title, options, disable, clickHandler}) => {
    const [active, setActive] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    useClickOutsideClose(dropdownRef,setActive);
  return (
    <Container>
        <Button type="button" onClick={()=>setActive((prev)=>!prev)} active={active}>{title}</Button>
        <MenuContainer active={active} ref={dropdownRef}>
        {
            options.map((option,index)=>{

                if(disable && disable[index]){
                   return (
                    <Option key={index} 
                            isDisable={disable && disable[index]}>
                     {disable && disable[index] &&  <FlexRow><s>{option}</s><p>(暫無庫存)</p></FlexRow> }
                    </Option>
                   )
                }else{
                    return (
                        <Option key={index} 
                                onClick={(e)=>clickHandler(e)}>
                            {option}
                        </Option> 
                    )
                } 
            }

               
                
            )
        }
        </MenuContainer>
    </Container>
  )
}

export default Dropdown;