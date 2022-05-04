import { createGlobalStyle } from "styled-components";
import { devices } from "./responsive";

export const GlobalStyle = createGlobalStyle`
:root{

--primaryColor:#ffa211;
--secondaryColor:teal;
--darkGray:#404040;
--lightGray:#c0c0c0;
--lightYellow:#faf6b9;
--beige:#fafaf2;
--navbarHeight:60px;
}
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Noto Sans TC', sans-serif;
    
}

a {
  text-decoration:none;
  color:black;
}

.swiper-pagination-bullet {
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-active {
  color: #fff;
  background: #3ecdcd;
}


::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

@media ${devices.tabletL}{
  --navbarHeight:50px;

}

@media ${devices.tablet}{
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
}

}

@media ${devices.mobile}{
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    transform:translateY(100%)
}

}

}
`