import React,{useState} from "react";
import {Input, Select} from "../Input";
import {Button} from "../../Common";
import {TransparentForm, Title, Notice} from "./styles";
import {Col2T1Wrapper} from "../../Wrapper/styles";
import {SignupSubmitHandler} from "../../../pages/signup";
import {SignupInputsState} from "../../../types";
import {MdOutlineCategory} from "react-icons/md";
import {BsPencilSquare} from "react-icons/bs";
import {AiOutlineEyeInvisible, AiOutlineMail} from "react-icons/ai";
import {RiUser5Line} from "react-icons/ri";
import {BiShowAlt} from "react-icons/bi";

const INITIAL_INPUTS = {
  name:"",
  gender:"",
  email:"",
  username:"",
  password:"",
  passwordConfirmation:""
}
const GENDER_OPTIONS = [
  {
    value:"男",
    displayText:"男",
  },
  {
    value:"女",
    displayText:"女",
  },
  {
    value:"其他",
    displayText:"其他",
  }
];

const IconColor:string = "var(--darkGray)"

interface SignupFromProps {
   submitHandler :SignupSubmitHandler;
}

export interface ShowPasswordsState {
  password:boolean;
  passwordConfirmation:boolean;
}

const SignupForm:React.FC<SignupFromProps> = ({submitHandler}) => {
  const [inputs, setInputs] = useState<SignupInputsState>(INITIAL_INPUTS);
  const [showPasswords, setShowPasswords] = useState<ShowPasswordsState>({password:false,passwordConfirmation:false});
  const [loading, setLoading] = useState<boolean>(false);
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
  } 
  
  return (
    <TransparentForm onSubmit={(e)=>{submitHandler(e, inputs, setLoading)}}>
     <Title>註冊成為會員</Title>
     <Col2T1Wrapper>
      <Input type="text" 
             name="name"
             value={inputs.name} 
             placeholder="姓名" 
             changeHandler={changeHandler} 
             Icon={BsPencilSquare}
             IconColor={IconColor}/>
      <Select 
             options={GENDER_OPTIONS} 
             Icon={MdOutlineCategory}
             IconColor={IconColor}/>
      <Input type="text" 
             name="email" 
             value={inputs.email} 
             placeholder="電子信箱" 
             changeHandler={changeHandler}
             Icon={AiOutlineMail}
             IconColor={IconColor}/>
      <Input type="text" 
             name="username" 
             value={inputs.username} 
             placeholder="用戶名稱" 
             changeHandler={changeHandler}
             Icon={RiUser5Line}
             IconColor={IconColor}/>
      <Input type={showPasswords.password?"text":"password"} 
             name="password" 
             value={inputs.password} 
             placeholder="密碼" 
             changeHandler={changeHandler}
             Icon={showPasswords.password? BiShowAlt: AiOutlineEyeInvisible}
             IconColor={IconColor}
             setShowPasswords={setShowPasswords}/>
      <Input type={showPasswords.passwordConfirmation?"text":"password"}  
             name="passwordConfirmation" 
             value={inputs.passwordConfirmation} 
             placeholder="確認密碼" 
             changeHandler={changeHandler}
             Icon={showPasswords.passwordConfirmation?BiShowAlt: AiOutlineEyeInvisible}
             IconColor={IconColor}
             setShowPasswords={setShowPasswords}/>
     </Col2T1Wrapper>
     <Notice>按下註冊鈕的同時，表示您已詳閱我們的資料使用政策與使用條款，同意使用 墊一店 所提供的服務並訂閱電子報。</Notice>
     <Button type="submit" content="註冊" isDisable={loading} backgroundColor="var(--primaryColor)" color="black" alignSelf="flex-end"/>
    </TransparentForm>
  )
}

export default SignupForm
