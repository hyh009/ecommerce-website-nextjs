import React, {useState} from 'react';
import { ErrorModal } from "../../Common"
import { UpdateUserState } from '../../../types/auth';
import { Container, Header, CoverImg, ImgContainer, CoverInput, ColorButton, ButtonContainer,
  Info,  Detail, UserName, CreatedDate, ContentContainer, Subtitle, ItemContainer} from './styles';
import { Input, Select } from '../../Form';
import { GENDER_OPTIONS } from '../../Form/AuthForm/SignupForm';
import { updateUser } from '../../../utils/authAction';
import Image from "next/image";
import { FixedWidthButton } from '../../Common';
import { MdPerson, MdEmail, MdPhoneAndroid, MdLocationOn } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import {IUserDocument} from "../../../models/User"

interface Props {
  user:IUserDocument;
  edit:boolean;
}

const ProfileCart:React.FC<Props> = ({user, edit}) => {
  const initInputs = {
    name:user.name,
    gender:user.gender,
    email:user.email,
    address:user.address,
    phone:user.phone
  }
  const [savedUser, setSavedUser] = useState<IUserDocument>(user);
  const [coverColor, setCoverColor] = useState<string>(user.coverColor);
  const [showColorChangeBtn, setShowColorChangeBtn] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [inputs, setInputs] = useState<UpdateUserState>(initInputs);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);

  const trackColorChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCoverColor(e.target.value);
    setShowColorChangeBtn(true);
  };

  const handleChangeColor = async () => {
    if (window.confirm("確定更換顏色嗎？")) {
      const {success, updatedUser, errorMsg} = await updateUser(savedUser._id, {coverColor:coverColor});
      if(!success){
        setCoverColor(savedUser.coverColor);
        setShowColorChangeBtn(false);
        return setErrorMsg(errorMsg);
      }
      setSavedUser(updatedUser);
      setShowColorChangeBtn(false);
    } else {
      setShowColorChangeBtn(false);
    }
  };

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    setInputs((prev)=>({...prev, [e.target.name]:e.target.value}));
  }

  return (
    <>
    <ErrorModal errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
    <Container>
      <Header>
        <CoverImg background={coverColor}>
          {edit && <CoverInput type="color" value={coverColor} onChange={trackColorChange}/>}
          <ImgContainer>
            <Image src={savedUser.profilePicUrl} alt="用戶照片" layout="fill" objectFit="cover"/>
          </ImgContainer>
        </CoverImg>
        {
          edit && showColorChangeBtn && <ColorButton type="button" onClick={handleChangeColor}>確定變更</ColorButton>
        }
      </Header>
      <Info>
          <Detail edit={edit}> 
            <UserName>{savedUser.name}</UserName>
            <CreatedDate>加入日期：{savedUser.createdAt && savedUser.createdAt.split("T")[0]}</CreatedDate>
          </ Detail>
          {edit && !enableEdit && <FixedWidthButton
            type="button"
            content="編輯"
            space="compact"
            width="20%"
            borderRadius="10px"
            backgroundColor="var(--primaryColor)"
            color="black"
            clickHandler={()=>setEnableEdit(true)}
          />}
          {edit && enableEdit && <ButtonContainer>
            <FixedWidthButton
            type="button"
            content="取消編輯"
            space="compact"
            borderRadius="10px"
            backgroundColor="var(--primaryColor)"
            color="black"
            width="40%"
            clickHandler={()=>{setInputs(initInputs);setEnableEdit(false)}}
          /><FixedWidthButton
            type="button"
            content="確定更新"
            space="compact"
            borderRadius="10px"
            backgroundColor="var(--primaryColor)"
            color="black"
            width="40%"
            clickHandler={()=>setEnableEdit(false)}
          />
          </ButtonContainer>}
      </Info>
      <ContentContainer>
      <Subtitle>用戶資訊</Subtitle>
      <ItemContainer>
        <Input type="text" border={edit && enableEdit?"1px solid lightGray":undefined} 
                           borderBottom="1px solid #eee" 
                           isDisabled={!edit || !enableEdit} 
                           value={inputs.name} 
                           name="name" 
                           Icon={MdPerson}
                           changeHandler={changeHandler}/>
        {
          edit && enableEdit?<Select options={GENDER_OPTIONS} 
                       Icon={FaRobot} 
                       name="gender"
                       value={inputs.gender}
                       border="1px solid lightGray" 
                       changeHandler={changeHandler}/>:<Input type="text"
                                                              name="gender"
                                                              borderBottom="1px solid #eee"
                                                              Icon={FaRobot}
                                                              value={savedUser.gender}
                                                              isDisabled={true}/>
        }
      </ItemContainer>
      <Subtitle>聯絡資訊</Subtitle>
      <ItemContainer>
        <Input type="text" border={edit && enableEdit?"1px solid lightGray":undefined} 
                           borderBottom="1px solid #eee" 
                           isDisabled={!edit || !enableEdit} 
                           value={inputs.email} 
                           name="email" 
                           Icon={MdEmail}
                           changeHandler={changeHandler}/>
        <Input type="text" border={edit && enableEdit?"1px solid lightGray":undefined} 
                           borderBottom="1px solid #eee" 
                           isDisabled={!edit || !enableEdit} 
                           value={inputs.phone? inputs.phone:"未設定"} 
                           name="phone" 
                           Icon={MdPhoneAndroid}
                           changeHandler={changeHandler}/>
        <Input type="text" border={edit && enableEdit?"1px solid lightGray":undefined} 
                           borderBottom="1px solid #eee" 
                           isDisabled={!edit || !enableEdit} 
                           value={inputs.address? inputs.address: "未設定" } 
                           name="address" 
                           Icon={MdLocationOn}
                           changeHandler={changeHandler}/>
      </ItemContainer>
      </ContentContainer>
    </Container>
    </>
  )
}

export default ProfileCart;