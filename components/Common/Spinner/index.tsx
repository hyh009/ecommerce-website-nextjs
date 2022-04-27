import {AiOutlineLoading3Quarters} from "react-icons/ai"
import styled from "styled-components";
import { rotate } from "../../../styles/animation"

export const IconSpinner = styled(AiOutlineLoading3Quarters)`
  display: inline-block;
  animation: ${rotate} 1.5s linear infinite;
`;

