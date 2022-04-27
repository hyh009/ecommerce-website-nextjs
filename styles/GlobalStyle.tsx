import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{

--primaryColor:#ffa211;
--secondaryColor:teal;
--darkGray:#404040;
}
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Noto Sans TC', sans-serif;
    
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
`