import React,{useEffect, useState, ReactElement} from 'react';
import type { GetServerSidePropsContext, NextLayoutComponentType } from 'next';
import { UserLayout } from '../components/Layout';
import { ProfileCard, ProfileFeature, ProfileChart, ProfileCart } from '../components/Profile';
import  withUserAuth  from '../components/HOC/withUserAuth';
import { Session } from 'next-auth';
import styled from 'styled-components';
import { axiosInstance } from '../utils/config';
import { IUser } from '../types/auth';
import { AxiosResponse } from 'axios';
import {MdAccountCircle, MdStars} from "react-icons/md";
import { devices } from '../styles/responsive';

interface Props {
  session:Session
}


const Profile:NextLayoutComponentType<Props> = ({session}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser|null>(null);

  useEffect(()=>{
    const controller = new AbortController();
    const getUserInfo = async () => {
      setIsLoading(true);
      const userRes:AxiosResponse<IUser> = await axiosInstance.get(`/api/user/find/${session.user._id}`,{signal:controller.signal});
      setUser(userRes.data);
      setIsLoading(false);
    };
    getUserInfo();
    return ()=>controller.abort();
  },[session.user._id]);


  if(isLoading){
    return <>Loading</>
  }

  return (
    <Container>
      <ContentContainer>
          {
            user &&
            <>
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
            </>
          }
      </ContentContainer>
      <ProfileCard/>
    </Container>
  )
}

export default Profile;

export const getServerSideProps =  withUserAuth(async (context:GetServerSidePropsContext,session:Session)=>{
    return {
      props: {
        session
      },
    }
});

Profile.getLayout = function PageLayout(page:ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

const Container = styled.div`
  grid-column:2/6;
  display:flex;
`;

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