import React,{ReactElement, useEffect} from 'react';
import type { GetServerSidePropsContext, NextLayoutComponentType } from 'next';
import { UserLayout } from '../components/Layout';
import  withUserAuth  from '../components/HOC/withUserAuth';
import { useSession } from "next-auth/react";
import { Session } from 'next-auth';



const Profile:NextLayoutComponentType = () => {


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
