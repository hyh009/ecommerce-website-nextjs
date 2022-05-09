import React from 'react';
import {CenterContainer} from "../../Wrapper/styles"
import styled from 'styled-components';
import { devices } from '../../../styles/responsive';

const VideoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;
  width: 60%;
  margin: 50px 0;
  @media ${devices.tabletL}{
      width:90%;
  }
`;
const Video = () => {
  return (
      <CenterContainer>
        <VideoContainer>
        <iframe
            id="player"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/9VnjHmoevXA"
            frameBorder="0"
            allowFullScreen
            title="墊一店-隨你PAD吸管"
            />
        </VideoContainer>
      </CenterContainer>
  )
}

export default Video;