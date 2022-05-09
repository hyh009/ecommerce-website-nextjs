import styled from "styled-components";
import { devices } from "../../../styles/responsive";

interface ContainerProps {
    position:"sticky"|"static"
}

interface CompanyMenuProps {
    show:boolean;
}

interface MenuTextProps {
  fontSize?: string;
}

export const Container = styled.div<ContainerProps>`
  height: var(--navbarHeight);
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid lightgray;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  position: ${(props) => props.position};
  top: 0;
  background-color: white;
  z-index: 4;
  padding:5px 20px;
  @media ${devices.tabletL}{
   position:static;
  }
  @media ${devices.mobile}{
    padding:10px;
}
`

export const Left = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  @media ${devices.mobile}{
      gap:5px;
  }
`;

export const IconContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
font-size:1.25rem;
`;

export const CompanySideMenu = styled.ul<CompanyMenuProps>`
  position: absolute;
  left: 0;
  top: 60px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #292828;
  width: 25%;
  height: calc(100vh - var(--navbarHeight));
  transition: 0.4s;
  padding: 20px;
  list-style-type: none;
  transform: ${(props) =>
    props.show === true ? "translateX(0)" : "translateX(-100%)"};
  @media ${devices.tabletL}{
    width: 100%;
    top: var(--navbarHeight);
    padding-bottom: 10%;
    justify-content: flex-end;
    gap: 2%;
 }
  @media ${devices.mobile}{
    padding: 100px 20px;
 }
`;

export const CompanyMenuItem = styled.li`
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(61,60,60,0);
  transition:0.5s;
  &:hover {
    background-color: rgba(61,60,60,1);
  }
`;

export const CustomLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  text-align: center;
  user-select: none;
  color: white;
  letter-spacing: 6px;
  font-weight: 580;
  cursor:pointer;
  width:100%;
  @media ${devices.mobile}{
      font-size:4.5vmin;
  }
`;

export const Logos = styled.a`
  display:flex;
  align-items:center;
  @media ${devices.mobile}{
      display:none ;
  }
`;

export const LogoContainer = styled.div`
  height: 35px;
  aspect-ratio:1/1;
  @media ${devices.mobile}{
      height:25px;
  }
`;

export const LogoTextContainer = styled.div`
  height: 35px;
  @media ${devices.mobile}{
      height:25px;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  height: 100%;
  @media ${devices.mobile}{
      flex:2;
      gap:10px;
  }
`;

export const Menuitem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  height: 35px;
  user-select: none;
  &:hover{
    background-color:#eee ;
  }
  @media ${devices.mobile}{
    padding:5px 0;
  }
`;

export const MenuText = styled.div<MenuTextProps>`
  font-size: ${(props)=>props.fontSize?props.fontSize:"14px"};
  padding: 5px 10px;
  color:black;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

export const Badge = styled.div`
  width: 16px;
  height: 16px;
  display:flex ;
  align-items:center;
  justify-content:center;
  background-color: red;
  border-radius:50%;
  color:white;
  position:absolute;
  top:0;
  right:0;
`;


export const BadgeText = styled.span`
   font-size:0.6rem;
   font-weight:bold;
`;