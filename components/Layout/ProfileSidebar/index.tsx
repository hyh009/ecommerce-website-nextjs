import React, {useEffect, useState} from 'react';
import { Container, SidebarWrapper, ArrowUp, ArrowDown, Title, ListContainer, List } from './styles';
import { ForwardRefProps } from '../../../types/basic';
import Link from "next/link";
import { useRouter } from 'next/router';
import {AiFillHome, AiFillHeart} from "react-icons/ai";
import {MdPerson, MdPassword, MdShoppingCart} from "react-icons/md";
import {RiFilePaper2Fill, RiCoupon2Fill} from "react-icons/ri"
import { IconType } from "react-icons";
import useCheckDevice from '../../../utils/hooks/useCheckDevice';
import { IUser } from '../../../types/auth';


interface ListProps extends ForwardRefProps {
    Icon:IconType;
    pageName:string;
    isActive:boolean;
}

const ListContent = React.forwardRef<HTMLAnchorElement,ListProps>(({href, onClick, Icon, pageName, isActive},ref) => {
    return (
    <a href={href} onClick={onClick} ref={ref}>
        <List className={isActive?"active":""}>
            <Icon style={{display:"inline-block"}}/>
            <span>{pageName}</span>
        </List>
    </a>)
});

ListContent.displayName = "ListContent";

interface Props {
    user:IUser;
}

const ProfileSidebar:React.FC<Props> = ({user}) => {
    const [showUpArrow, setShowUpArrow] = useState(false);
    const [showList, setShowList] = useState(true);
    const devices = useCheckDevice();
    const router = useRouter();
    const isActive = (pathname:string)=>pathname===router.pathname;
    useEffect(()=>{
        if(devices!=="desktop"){
            setShowList(false);
            setShowUpArrow(false);
        }else{
            setShowList(true);
        }
    },[devices])
  return (
    <Container showList={showList}>
        <SidebarWrapper>
            <Title showList={showList}>{`${user.name}的頁面`}
            {showUpArrow ? (
                  <ArrowUp
                    onClick={() => {
                      setShowList(false);
                      setShowUpArrow(false);
                    }}
                  />
                ):<ArrowDown
                    onClick={() => {
                    setShowList(true);
                    setShowUpArrow(true);
                    }}
                  />}
            </Title>
            {
                showList &&
                <>
                <ListContainer>
                    <Link href="/profile" passHref>
                        <ListContent pageName="我的頁面" Icon={AiFillHome} isActive={isActive("/profile")}/>
                    </Link>
                    <Link href="/profile/edit" passHref>
                        <ListContent pageName="編輯帳戶資訊" Icon={MdPerson} isActive={isActive("/profile/edit")}/>
                    </Link> 
                    <Link href="/profile/changepassword" passHref>
                        <ListContent pageName="更改密碼" Icon={MdPassword} isActive={isActive("/changepassword")}/>
                    </Link> 
                    <Link href="/profile/order" passHref>
                        <ListContent pageName="我的訂單" Icon={RiFilePaper2Fill} isActive={isActive("/profile/order")}/>
                    </Link> 
                    <Link href="/cart" passHref>
                        <ListContent pageName="我的購物車" Icon={MdShoppingCart} isActive={isActive("/cart")}/>
                    </Link>
                    <Link href="/wish" passHref>
                        <ListContent pageName="我的願望清單" Icon={AiFillHeart} isActive={isActive("/wish")}/>
                    </Link>
                    <Link href="/profile/coupon" passHref>
                        <ListContent pageName="我的優惠券" Icon={RiCoupon2Fill} isActive={isActive("/profile/coupon")}/>
                    </Link>
                </ListContainer>
                </>
            }
        </SidebarWrapper>
    </Container>
  )
}

export default ProfileSidebar;