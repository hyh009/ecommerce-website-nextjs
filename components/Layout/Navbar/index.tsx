import React,{useRef, useState,useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import {Avator} from "../../Common";
import {Container,Left,IconContainer,
  CompanySideMenu,CompanyMenuItem,CustomLink,Logos,LogoContainer,LogoTextContainer,
  Right,Menuitem,MenuText} from "./styles";
import useClickOutsideClose from "../../../utils/hooks/useClickOutsideClose";
import {AiOutlineClose,AiOutlineMenu,AiOutlineShoppingCart} from "react-icons/ai";
import {IconType}from "react-icons";
import {ForwardRefProps} from "../../../types/basic";
import navbarItem from "../../../utils/data/navbarItem";


interface Props {
  position:"static"|"sticky"
}

interface CompanyMenuListProps extends ForwardRefProps{
  navLinkText:string;
} 

interface NavMenuProps extends ForwardRefProps {
  text?:string;
  Icon?:IconType;
  fontSize?:string;
}

const CompanyMenuList = React.forwardRef<HTMLAnchorElement,CompanyMenuListProps>(({href, onClick, navLinkText},ref)=>{
    return (
      <CustomLink ref={ref} href={href} onClick={onClick}>
        <CompanyMenuItem>
          {navLinkText}
        </CompanyMenuItem>
      </CustomLink>
    )
});

CompanyMenuList.displayName = "CompanyMenuList"

const Logo = React.forwardRef<HTMLAnchorElement,ForwardRefProps>(({href, onClick},ref)=>{
  return (
    <Logos ref={ref} onClick={onClick} href={href}>
      <LogoContainer>
      <Image src="https://res.cloudinary.com/dh2splieo/image/upload/v1640706201/shop_website/imgs/logo/pad_logo_wkibae.png"
             alt="墊一店-Logo"
             height="100%"
             width="100%"
             objectFit="contain"
             />
    </LogoContainer>
    <LogoTextContainer>
      <Image src="https://res.cloudinary.com/dh2splieo/image/upload/v1640706199/shop_website/imgs/logo/name_jzjdfr.jpg"
             alt="墊一店"
             height="35%"
             width="100%"
             objectFit="contain"/>
    </LogoTextContainer>
    </Logos>
  )
})

Logo.displayName = "Logo";

const NavMenu = React.forwardRef<HTMLAnchorElement,NavMenuProps>(({href,onClick,text, Icon, fontSize},ref)=>{
    return (
      <a ref={ref} href={href} onClick={onClick}>
        <Menuitem>
          <MenuText fontSize={fontSize}>{text&&text}{Icon&&<Icon/>}</MenuText>
        </Menuitem>
      </a>
    )
})

NavMenu.displayName = "NavMenu";

const Navbar:React.FC<Props> = ({position}) => {
  const { data: session, status } = useSession()
  const [show, setShow] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const router =useRouter();
  useClickOutsideClose(menuRef, setShow);

  const logoutHandler = ():void => {
    signOut();
  }
  // close companymenu after path changed
  useEffect(() => {
    setShow(false);
  }, [router.asPath]);

  return (
    <Container position={position}>
      <Left>
        <IconContainer onClick={()=>setShow((prev)=>!prev)}>
        {show? <AiOutlineClose /> : <AiOutlineMenu />}
        </IconContainer>
        <CompanySideMenu ref={menuRef} show={show}>
          {
            navbarItem.map((item, index)=>(
              <Link key={index} href={item.pathname} passHref>
                <CompanyMenuList navLinkText={item.navLinkText} />
              </Link>
            ))
          }
        </CompanySideMenu>
        <Link href="/" passHref>
            <Logo/>
        </Link>
      </Left>
      <Right>
        <Link href="/cart" passHref>
           <NavMenu Icon={AiOutlineShoppingCart} fontSize="20px"/>
        </Link>
        {
          status==="unauthenticated" && 
          <>
           <Link href="/login" passHref>
              <NavMenu text="登入"/>
            </Link>
            <Link href="/signup" passHref>
              <NavMenu text="註冊"/>
            </Link>
          </>
        }
        { 
           status==="authenticated" && 
          <>
            <NavMenu text="登出" onClick={logoutHandler}/>
            <Avator src={session.user?.image as string} 
                    alt={session.user?.name as string} 
                    shape="circle" 
                    border="2px solid var(--secondaryColor)"/>
          </>
        }
      </Right>
    </Container>
  )
}

export default Navbar