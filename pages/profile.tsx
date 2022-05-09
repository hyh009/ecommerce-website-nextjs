import React,{ReactElement, useEffect} from 'react';
import type { GetServerSidePropsContext, NextLayoutComponentType } from 'next';
import { UserLayout } from '../components/Layout';
import  withUserAuth  from '../components/HOC/withUserAuth';
import { useSession } from "next-auth/react";
import { Session } from 'next-auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCart } from '../store/reducer/cartReducer';



const Profile:NextLayoutComponentType = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state=>state.cart);


  return (
    <div>Profile</div>
  )
}

export default Profile;

export const getServerSideProps =  withUserAuth(async (context:GetServerSidePropsContext,session:Session)=>{
  //fetch user data
});

Profile.getLayout = function PageLayout(page:ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
