import React,{useEffect, useState} from 'react';
import Link from "next/link";
import Image from 'next/image';
import {Navigation, Pagination,Autoplay,EffectFade} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';
import useCheckDevice from '../../../utils/hooks/useCheckDevice';
import {Container, ImgContainer, TextContainer,Title,Description,LinkButton,Arrow,
  CatContainer, CatButton, CustomImg, Info, CatName, ArrowCircle, ProductImgContainer, ThumbImgContainer} from "./styles";
import {FlexCol} from "../../Wrapper/styles"
  import {categories} from "../../../utils/data/productCat";
import { ProductImgType } from '../../../types/product';
import {GrPrevious,GrNext} from "react-icons/gr";
import {VscTriangleLeft,VscTriangleRight} from "react-icons/vsc";
import {sliderItems} from "../../../utils/data/sliderContent";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';


export const HomeSlider:React.FC = () => {

    const pagination = {
        clickable: true,
        renderBullet: function (index:number, className:string) {
          return '<span class="' + className + '">' + "</span>";
        },
      };

    return (
      <Swiper
        modules={[Navigation, Pagination,Autoplay,EffectFade]}
        loop={true}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        initialSlide={0}
        pagination={pagination}
        autoplay={{delay:5000}}
        speed={1000}
        navigation={{nextEl: ".next",
                     prevEl: ".prev",
                    }}
      >
               {
            sliderItems.map((item, index)=>(
                <SwiperSlide key={index} >
                  <Container backgroundColor={item.bg} key={index}>
                    <ImgContainer>
                      <Image src={item.img} alt={item.title} layout="fill" objectFit="cover" priority/>
                    </ImgContainer>
                    <TextContainer>
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                        <Link href={`/products/${encodeURIComponent(item._id)}`} passHref>
                            <LinkButton>{item.button}</LinkButton>
                        </Link>
                    </TextContainer>
                  </Container>
                </SwiperSlide>))
        }
        {/* custom navigation */}
        <Arrow className="prev" position="left" ><GrPrevious/></Arrow>
        <Arrow className="next" position="right" ><GrNext/></Arrow>
      </Swiper>
    );
  };



export const CategoriesSlider:React.FC = () => {
  const [sliderNumber, setSliderNumber] = useState<number>(0);
  const device = useCheckDevice();

  // set slider preview number by device
  useEffect(()=>{
    const setSliderNumberByDevice = ():void =>{
      if(device==="mobile"){
        setSliderNumber(2);
      }else if(device==="tablet"){
        setSliderNumber(3);
      }else if (device==="tabletL" || device==="desktop"){
        setSliderNumber(4);
      }
    }
    setSliderNumberByDevice();
  },[device]);


  return (
    <Swiper modules={[Navigation,]}
            spaceBetween={0}
            initialSlide={0}
            speed={800}
            loop={true}
            slidesPerView={sliderNumber}
            navigation={{nextEl: ".cat_next",
                        prevEl: ".cat_prev"}}
            >

          {
            categories.map((cat,index)=>(
              <SwiperSlide key={index} >
                <CatContainer>
                  <CustomImg src={cat.img} alt={cat.name} layout="fill" objectFit="cover"/>
                  <Info>
                    <CatName>{cat.name}</CatName>
                    <Link passHref href={{
                      pathname:"/products",
                      query:{
                        category:cat.name
                      }
                    }}>
                      <CatButton>SHOP NOW</CatButton>
                    </Link>
                  </Info>
                </CatContainer>
              </SwiperSlide>
            ))
          }
        
        {/* custom navigation */}
        <ArrowCircle className="cat_prev" position="left" ><VscTriangleLeft/></ArrowCircle>
        <ArrowCircle className="cat_next" position="right" ><VscTriangleRight/></ArrowCircle>
    </Swiper>
  )
}


interface ProductImgsProps {
  imgs:ProductImgType[],
}

export const ProductImgSlider:React.FC<ProductImgsProps> = ({imgs}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return(
  <FlexCol>
    <Swiper
      style={{width:"100%"}}
      modules={[Navigation,Thumbs,EffectFade]}
      loop={true}
      effect="fade"
      spaceBetween={20}
      slidesPerView={1}
      initialSlide={0}
      speed={300}
      navigation={{nextEl: ".product_next",
                  prevEl: ".product_prev",
                  }}
      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
    >
    {
      imgs.map((img)=>(
        <SwiperSlide key={img._id}>
          <ProductImgContainer>
            <Image src={img.src} alt={img.desc} layout="fill" objectFit="cover"/>
          </ProductImgContainer>
        </SwiperSlide>
      ))
    }
      {/* custom navigation */}
      <Arrow className="product_prev" position="left" ><GrPrevious/></Arrow>
      <Arrow className="product_next" position="right" ><GrNext/></Arrow>
    </Swiper>
    <Swiper
      style={{width:"100%"}}
      modules={[Thumbs]}
      onSwiper={setThumbsSwiper}
      spaceBetween={5}
      slidesPerView={6}
      slideToClickedSlide={true}
      >
      {
          imgs.map((img)=>(
            <SwiperSlide key={img._id}>
              <ThumbImgContainer>
                <Image src={img.src} alt={img.desc} layout="fill" objectFit="cover"/>
              </ThumbImgContainer>
            </SwiperSlide>
          ))
        } 
    </Swiper>
  </FlexCol>
  )
}