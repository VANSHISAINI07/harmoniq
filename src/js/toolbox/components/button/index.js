import React from 'react';
import styled from 'styled-components';
import Icon from '../icon';

const Container = styled.div`
   display: flex;
   min-height: 48px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.08);
   cursor: pointer;
   padding: 10px 14px;
   border-radius: 6px;
   transition: background 0.15s ease;

   :first-of-type {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
   }

   &:hover {
      background: rgba(255, 255, 255, 0.06);
   }

   &:active {
      background: rgba(255, 255, 255, 0.1);
   }
`;

const TextContainer = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   justify-content: center;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   h2 {
      font-weight: 700;
      color: ${props => (props.isPlaying ? '#1ed760' : '#ffffff')};
      user-select: none;
      font-size: 15px;
      margin: 0;
   }

   h4 {
      font-weight: 500;
      color: #b3b3b3;
      user-select: none;
      font-size: 12px;
      margin: 3px 0 0 0;
   }
`;

const Label = styled.h2`
   margin: 0;
`;

const SubLabel = styled.h4`
   margin: 0;
`;

const OptionsContainer = styled.div`
   height: 3em;
   width: 3em;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #b3b3b3;

   &:hover {
      color: #ffffff;
   }
`;

const ChevronContainer = styled.div`
   height: 3em;
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

const Button = ({
   index,
   theme,
   label,
   sublabel,
   showIndex,
   isPlaying,
   OptionsMenu,
   onClick,
   chevron,
   onOptionsClick,
}) => {
   const handleOptionsClick = e => {
      e.stopPropagation();
      if (onOptionsClick) onOptionsClick();
   };

   return (
      <Container onClick={onClick}>
         <TextContainer isPlaying={isPlaying} theme={theme}>
            <Label>{label}</Label>
            {sublabel && <SubLabel>{sublabel}</SubLabel>}
         </TextContainer>
         {OptionsMenu && (
            <OptionsContainer onClick={handleOptionsClick}>
               <Icon name="more-horizontal" />
            </OptionsContainer>
         )}
         {chevron && (
            <ChevronContainer>
               <Icon name="chevron-right" />
            </ChevronContainer>
         )}
      </Container>
   );
};

export default Button;
