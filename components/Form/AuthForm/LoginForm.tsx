import React,{useState} from 'react';
import Link from "next/link";
import { WhiteForm, Title, LinkContainer, LinkText } from './styles';
import {Input} from "../Input";
import { Button } from '../../Common';
import { LoginInputsState } from '../../../types/auth';
import {LoginSubmitHandler} from "../../../pages/login"
import {AiOutlineEyeInvisible, AiOutlineMail} from "react-icons/ai";
import {BiShowAlt} from "react-icons/bi";

type showPassword = {password:boolean}

interface Props {
    submitHandler:LoginSubmitHandler
}

const IconColor= "var(--darkGray)"

const LoginForm:React.FC<Props> = ({submitHandler}) => {
    const [inputs, setInputs] = useState<LoginInputsState>({email:"",password:""});
    const [showPassword, setShowPassword] = useState<showPassword>({password:false});
    const [loading, setLoading] = useState<boolean>(false);
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
  return (
    <WhiteForm onSubmit={(e)=>{submitHandler(e,inputs,setLoading)}}>
        <Title>登入會員</Title>
        <Input type="text" 
               name="email" 
               value={inputs.email}
               changeHandler={changeHandler}
               placeholder="Email" 
               Icon={AiOutlineMail} 
               IconColor={IconColor}
               border="1px solid lightgray"/>
        <Input type={showPassword.password?"text":"password"} 
               name="password" 
               value={inputs.password}
               changeHandler={changeHandler} 
               placeholder="密碼" 
               Icon={showPassword.password?BiShowAlt:AiOutlineEyeInvisible}
               IconColor={IconColor}
               setShowPasswords={setShowPassword} 
               border="1px solid lightgray"/>
       <Button type="submit" 
               content="登入"
               isDisable={loading || !inputs.password || !inputs.email} 
               backgroundColor="var(--primaryColor)" 
               color="black" 
               space="compact" 
               width="35%" 
               alignSelf="center"/>
       <LinkContainer>
            <Link href="#" passHref><LinkText>忘記密碼</LinkText></Link>
            <Link href="/signup" passHref><LinkText>註冊用戶</LinkText></Link>
       </LinkContainer>
    </WhiteForm>
  )
}

export default LoginForm