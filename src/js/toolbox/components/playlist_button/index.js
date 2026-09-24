import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   height: 112px;
   cursor: pointer;
   padding: 8px 12px;
   border-radius: 8px;
   transition: background 0.15s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.06);
   }

   &:active {
      background: rgba(255, 255, 255, 0.1);
   }
`;

const ImgContainer = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 96px;
   width: 96px;
   border-radius: 6px;
   overflow: hidden;
   background: #282828;
   box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
`;

const Artwork = styled.img`
   height: 100%;
   width: 100%;
   object-fit: cover;
   pointer-events: none;
   user-select: none;
`;

const TextContainer = styled.div`
   display: flex;
   align-items: center;
   flex: 1;
   margin: 8px 0 4px 16px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Title = styled.h3`
   font-weight: 700;
   margin: 0;
   user-select: none;
   color: ${props => (props.color ? color[props.color][4] : '#ffffff')};
   font-size: 16px;
`;

const ChevronContainer = styled.div`
   height: 100%;
   width: 3em;
   display: flex;
   justify-content: center;
   align-items: center;

   svg {
      color: #b3b3b3;
      height: 20px;
      width: 20px;
   }
`;

const PlaylistButton = ({
   title,
   img,
   color,
   chevron,
   onClick,
}) => {
   return (
      <Container onClick={onClick}>
         <ImgContainer>
            <Artwork src={img || 'images/default_artwork.svg'} />
         </ImgContainer>
         <TextContainer>
            <Title color={color}>{title}</Title>
         </TextContainer>
         {chevron && (
            <ChevronContainer>
               <Icon name="chevron-right" />
            </ChevronContainer>
         )}
      </Container>
   );
};

export default PlaylistButton;
