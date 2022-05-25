import React,{ useState, ReactElement} from 'react';
import Error from "next/error";
import type { GetServerSidePropsContext, NextLayoutComponentType } from 'next';
import { UserLayout } from '../../components/Layout';
import { ProfileCard, ProfileFeature, ProfileChart, ProfileCart } from '../../components/Profile';
import { ProfileContainer } from '../../components/Wrapper/styles';
import  withUserAuth  from '../../components/HOC/withUserAuth';
import styled from 'styled-components';
import { IUserDocument } from '../../models/User';
import {MdAccountCircle, MdStars} from "react-icons/md";
import { devices } from '../../styles/responsive';

interface Props {
  user:IUserDocument;
  errorCode:number;
}


const Profile:NextLayoutComponentType<Props> = ({user, errorCode}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <ProfileContainer>
      {
        user && 
        <>
        <ContentContainer>
        <MiddleTop>
          <ProfileFeature title="今年度會員分級"
                    content={user.lank} 
                    Icon={user.lank==="普通會員"?MdAccountCircle:MdStars} 
                    desc={user.lank==="普通會員"?"消費折扣：無": "消費折扣：消費享9折優惠"}/>
          <ProfileFeature title="下年度會員分級"
                    content={user.lank} 
                    Icon={user.lank==="普通會員"?MdAccountCircle:MdStars} 
                    desc={user.lank==="普通會員"?"再消費 NT$ 5000 升級VIP會員": "恭喜下年度升級VIP會員"}/>
          <ProfileFeature title="我的優惠券"
                    content={user.coupon.length.toString()} 
                    desc="本月過期優惠券0"/>
        </MiddleTop>
        <ProfileChart/>
        <ProfileCart/>
        </ContentContainer>
        <ProfileCard user={user} edit={false}/>
        </>
      }
    </ProfileContainer>
  )
}

export default Profile;

export const getServerSideProps =  withUserAuth(async (context:GetServerSidePropsContext, user:IUserDocument, errorCode:number)=>{
    if(errorCode){
      return {
        props:{
          errorCode
        }
      }
    }
  
    return {
      props: {
        user:JSON.parse(JSON.stringify(user))
      },
    }
});

Profile.getLayout = function PageLayout(page:ReactElement) {
  const { props } = page;
  return <UserLayout user={props.user}>{page}</UserLayout>;
};

const ContentContainer = styled.div`
  flex:1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap:10px;
`;

const MiddleTop = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap:10px;
  flex: 1;
  @media ${devices.mobile}{
    grid-template-columns:repeat(1, 1fr);
  }
`;