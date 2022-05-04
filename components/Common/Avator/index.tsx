import React from "react";
import Image from "next/image";
import {ImgContainer} from "./styles";

interface Props  {
  src: string // img source url
  alt: string // alt text
  size?: "auto" | "small"   //  auto(w & h 100%), small(20px) default(35px)
  shape?: "circle" //  circle, default(square)
  border?: string // border => className
  title?:string // title for Avator
}

const Avator: React.FC<Props> = ({ src, alt, size, shape, border, title }) => {
  return (
    <ImgContainer title={title||alt} size={size} shape={shape} border={border}>
      <Image
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        objectFit="cover"
      />
    </ImgContainer>
  );
};



export default Avator;
