import styled from "styled-components";
import { devices } from "../../../styles/responsive";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

interface ContainerProps {
    showList:boolean;
}


export const Container = styled.div<ContainerProps>`
  position: sticky;
  top: 60px;
  left: 0;
  background-color: #fffdf6;
  height: calc(100vh - 60px);
  grid-column: 1/2;
  z-index:1;
  @media ${devices.tabletL}{
    position:absolute;
    height:max-content;
    width:100%;
    box-shadow:0 0 5px #eee;
  }
`;

export const SidebarWrapper = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  @media ${devices.tabletL}{
      padding:5px;
  }
`;

interface TitleProps {
  showList:boolean;
}

export const Title = styled.h3<TitleProps>`
  letter-spacing: 3px;
  font-size: 0.875rem;
  color: #acb2ac;
  margin-bottom: 5px;
  font-weight: 550;
  display: flex;
  align-items: center;
  padding: 10px 0;
  @media ${devices.tabletL}{
    padding:5px 0;
    margin-bottom:${(props)=>props.showList?"10px":"0"};
  }
`;

export const ArrowUp = styled(AiOutlineArrowUp)`
    cursor: pointer;
    display: none;
    @media ${devices.tabletL}{
        display: inline-block;
    }
`;

export const ArrowDown = styled(AiOutlineArrowDown)`
    cursor: pointer;
    display: none;
    @media ${devices.tabletL}{
        display: inline-block;
    }
`;

export const ListContainer = styled.ul`
    display:flex;
    flex-direction:column;
    gap:20px;
    list-style-type:none;
`;


export const List = styled.li`
  display: flex;
  align-items:center;
  gap: 10px;
  padding:5px;
  cursor: pointer;
  transition:0.3s;
  &:hover{
    color:var(--darkGray);
    background-color: #fefbd0;
    border-radius: 10px;
  }
  &.active{
    background-color: #e2fff4;
    border-radius: 10px;
  }
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  letter-spacing: 2px;
  font-size: 1rem;
  gap:10px;
  @media {$devices.tabletL}{
    justify-content:center;
  }
  svg {
    font-size: 1.25rem;
  }
  span {
    margin-left: 5px;
  }
`;