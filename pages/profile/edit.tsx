import React,{useEffect, useState, ReactElement} from 'react';
import {UserLayout} from "../../components/Layout/index";
import { ImageUpload } from '../../components/Common';
import { GetServerSidePropsContext, NextLayoutComponentType } from 'next';
import { IUser } from '../../types/auth';
import styled from "styled-components";
import { devices } from '../../styles/responsive';
import { ProfileCard } from "../../components/Profile";
import { ProfileContainer } from '../../components/Wrapper/styles';
import  withUserAuth  from '../../components/HOC/withUserAuth';
import {IUserDocument} from "../../models/User";

interface Props {
  user:IUserDocument
}

const ProfileEdit:NextLayoutComponentType<Props> = ({user}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ProfileContainer>
        {user && <ProfileCard user={user} edit={true}/>}
        <ImageUpload/>
    </ProfileContainer>
  )
}

export default ProfileEdit;

export const getServerSideProps =  withUserAuth(async (context:GetServerSidePropsContext,user:IUser, errorCode:number)=>{
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

ProfileEdit.getLayout = function PageLayout(page:ReactElement) {
  const { props } = page;
    return <UserLayout user={props.user}>{page}</UserLayout>;
  };
