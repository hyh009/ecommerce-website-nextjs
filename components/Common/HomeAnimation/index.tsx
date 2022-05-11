import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Container, CoverImgContainer, CoverText, Click, LoaderContainer } from './styles';
import TextAnimation from './TextAnimation';
import {TextLoader, LinearBar} from "../index";
import Image from "next/image";
import { useKeyboardEventListener } from '../../../utils/hooks/useEventListener';
import useCheckDevices from "../../../utils/hooks/useCheckDevice";

interface Props {
    animationShowed:boolean;
    setAnimationShowed:Dispatch<SetStateAction<boolean>>;
}

const HomeAnimation:React.FC<Props> = ({animationShowed, setAnimationShowed}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const currentDevice = useCheckDevices();

    const shortcut = useCallback((e:KeyboardEvent):void=>{
      if(e.key==="Enter"){
        setAnimationShowed(true);
      }
    },[setAnimationShowed])
    useKeyboardEventListener("keydown", shortcut)
  return (
    <Container className={animationShowed ? "slideOut" : ""}>
      {isLoading && (
         <LoaderContainer>
            <TextLoader text="資料讀取中..."/>
            <LinearBar/>
         </LoaderContainer>
      )}
      <CoverImgContainer isLoading={isLoading}>
        <Image
          src={
            "https://res.cloudinary.com/dh2splieo/image/upload/v1646313543/shop_website/imgs/cover/straw_rainbow_cover_z6gvtp.png"
          }
          alt="封面照片"
          layout="fill"
          objectFit="cover"
          objectPosition={currentDevice==="mobile"?"75%":"right 70%"}
          onLoadingComplete={()=>setIsLoading(false)}
          priority
        />
        {!isLoading && (
          <CoverText>
            <TextAnimation text="墊一店" />
            <br />
            <TextAnimation order="second" text="用液態矽膠照顧你的生活" />
          </CoverText>
        )}
        {!isLoading &&(
          <Click
            tabIndex={0}
            title="點擊進入"
            onClick={() => setAnimationShowed(true)}
          >
            Enter
          </Click>
        )}
      </CoverImgContainer>
    </Container>
  )
}

export default HomeAnimation;
