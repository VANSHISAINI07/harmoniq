import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { openAuthModal } from '../../auth/actions';

const BannerContainer = styled.div`
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   height: 68px;
   background: linear-gradient(90deg, #af2896 0%, #509bf5 100%);
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 12px 24px;
   z-index: 90;
   box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);

   @media screen and (max-width: 600px) {
      padding: 10px 14px;
      height: 72px;
   }
`;

const TextSection = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2px;
   min-width: 0;
`;

const BannerTitle = styled.span`
   font-size: 14px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: 0.2px;
   text-transform: uppercase;
`;

const BannerSubtitle = styled.span`
   font-size: 13px;
   font-weight: 500;
   color: #ffffff;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   @media screen and (max-width: 700px) {
      font-size: 12px;
   }
`;

const SignUpFreeButton = styled.button`
   background: #ffffff;
   color: #000000;
   border: none;
   border-radius: 9999px;
   font-size: 14px;
   font-weight: 800;
   padding: 12px 30px;
   cursor: pointer;
   flex-shrink: 0;
   transition: all 0.2s ease;

   &:hover {
      background: #f4f4f4;
      transform: scale(1.04);
   }

   &:active {
      transform: scale(0.98);
   }

   @media screen and (max-width: 500px) {
      padding: 10px 18px;
      font-size: 13px;
   }
`;

class PreviewBanner extends Component {
   render() {
      const { openAuthModal } = this.props;

      return (
         <BannerContainer>
            <TextSection>
               <BannerTitle>Preview of Harmoniq</BannerTitle>
               <BannerSubtitle>
                  Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
               </BannerSubtitle>
            </TextSection>
            <SignUpFreeButton onClick={() => openAuthModal('signup')}>
               Sign up for free
            </SignUpFreeButton>
         </BannerContainer>
      );
   }
}

const mapDispatchToProps = dispatch => ({
   openAuthModal: tab => dispatch(openAuthModal(tab)),
});

export default connect(null, mapDispatchToProps)(PreviewBanner);
