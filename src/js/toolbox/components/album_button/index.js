import React, { Component } from 'react';
import styled from 'styled-components';

const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
   margin: 0 16px 24px 0;
   width: 180px;
   cursor: pointer;
   transition: all 0.25s ease;
   background: #181818;
   padding: 14px;
   border-radius: 8px;
   position: relative;

   ${breakpointSm} {
      margin: 10px 10px 0 0;
      width: auto;
      flex: 0 46%;
      padding: 10px;
   }

   &:hover {
      background: #282828;
      transform: translateY(-4px);
   }

   &:active {
      transform: translateY(0);
   }
`;

const ImgContainer = styled.div`
   position: relative;
   width: 100%;
   padding-bottom: 100%;
   margin-bottom: 12px;
   border-radius: 6px;
   overflow: hidden;
   background: #282828;
   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);

   ${breakpointSm} {
      margin-bottom: 8px;
   }
`;

const PlayOverlay = styled.div`
   position: absolute;
   right: 8px;
   bottom: 8px;
   width: 44px;
   height: 44px;
   border-radius: 50%;
   background: #1ed760;
   color: #000;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 18px;
   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
   opacity: 0;
   transform: translateY(8px);
   transition: all 0.25s ease;

   ${Container}:hover & {
      opacity: 1;
      transform: translateY(0);
   }

   &:hover {
      transform: scale(1.08) !important;
      background: #1fdf64;
   }
`;

const Artwork = styled.img`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 6px;
   display: block;
   transition: opacity 0.3s ease;
   background: #282828;
`;

const TextContainer = styled.div`
   margin: 4px 0 0 0;
   width: 100%;
`;

const Label = styled.h4`
   font-size: 14px;
   font-weight: 700;
   color: #ffffff;
   margin: 0 0 4px 0;
   user-select: none;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const SubLabel = styled.h4`
   color: #b3b3b3;
   font-size: 12px;
   font-weight: 500;
   margin: 0;
   user-select: none;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

class AlbumButton extends Component {
   state = {
      imgSrc: this.props.artwork || 'images/default_artwork.svg',
      hasError: false,
   };

   componentDidUpdate(prevProps) {
      if (prevProps.artwork !== this.props.artwork) {
         this.setState({
            imgSrc: this.props.artwork || 'images/default_artwork.svg',
            hasError: false,
         });
      }
   }

   onError = () => {
      if (!this.state.hasError) {
         this.setState({
            imgSrc: 'images/default_artwork.svg',
            hasError: true,
         });
      }
   };

   render() {
      const { label, sublabel, onClick } = this.props;
      const { imgSrc } = this.state;

      return (
         <Container onClick={onClick}>
            <ImgContainer>
               <Artwork
                  src={imgSrc}
                  alt={label}
                  loading="lazy"
                  onError={this.onError}
               />
               <PlayOverlay title={`Play ${label}`}>▶</PlayOverlay>
            </ImgContainer>
            <TextContainer>
               <Label title={label}>{label}</Label>
               <SubLabel title={sublabel}>{sublabel}</SubLabel>
            </TextContainer>
         </Container>
      );
   }
}

export default AlbumButton;
