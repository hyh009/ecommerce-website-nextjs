import styled from "styled-components";
import { devices } from "../../../styles/responsive";

interface ContainerProps {
    background?:string;
}
interface IconContainerProps {
  background?:string;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: ${(props) => props.background?props.background:"white"};
  @media ${devices.tabletL}{
    padding:20px 10px;
}
  @media ${devices.mobile}{
      flex-direction:column;
      padding:0;
  }
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  @media ${devices.mobile}{
      align-items:center;
      text-align:center;
  }
`;

export const Logo = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  text-shadow: 2px 2px lightgray;
`;

export const Description = styled.p`
  margin: 20px 0;
  font-weight: 300;
  line-height: 30px;
`;

export const IconContainer = styled.div<IconContainerProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  font-size:20px;
  transition:0.1s;
  &:hover{
    filter:brightness(95%);
    transform:scale(1.05);
  }
  @media ${devices.mobile}{
    width:50px ;
    height: 50px;
  }
`;


export const Center = styled.div`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  @media ${devices.tablet}{
    display: none;
  }
`;

export const Title = styled.h3`
  margin-bottom: 10px;
  font-weight: 400;
`;

export const ListContainer = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const CustomLink = styled.a`
  width: 100%;
  cursor:pointer ;
`;

export const ListItem = styled.li`
  width: 100%;
  margin: 5px 0;
  color: black;
`;

export const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media ${devices.mobile}{
    background-color:rgba(230,230,230,0.9);
    width:100%;
    padding:10px;
  }
`;

export const ContactItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap:10px;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  font-size:1.375rem;
`;
