import React from "react";
import Image from "next/image";
import {ImgContainer} from "./styles";
import Link from "next/link";
import {ForwardRefProps} from "../../../types/basic";

interface Props  {
  src: string;// img source url
  alt: string; // alt text
  size?: "auto" | "small";   //  auto(w & h 100%), small(20px) default(35px)
  shape?: "circle"; //  circle, default(square)
  border?: string; // border => className
  title?:string; // title for Avator
  link?:string;
}


type LinkProps = Props & ForwardRefProps;

const LinkAvator = React.forwardRef<HTMLAnchorElement,LinkProps>(({href, onClick, title, src, alt, size, shape, border}, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <ImgContainer title={title||alt} size={size} shape={shape} border={border}>
      <Image
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        objectFit="cover"
      />
    </ImgContainer>
    </a>
  )
});

LinkAvator.displayName = "LinkAvator";


const Avator: React.FC<Props> = ({ src, alt, size, shape, border, title, link }) => {
  if(link) {
    return (
    <Link href={link} passHref>
      <LinkAvator src={src} alt={alt} title={title} size={size} shape={shape} border={border}/>
    </Link>
   )
  }
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
