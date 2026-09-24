import React, { Component } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
   position: fixed;
   bottom: 74px;
   right: 20px;
   z-index: 70;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

   @media screen and (max-width: 750px) {
      bottom: 125px;
      right: 12px;
   }
`;

const BadgePill = styled.button`
   display: inline-flex;
   align-items: center;
   gap: 8px;
   padding: 8px 16px;
   border-radius: 24px;
   background: rgba(18, 18, 22, 0.88);
   backdrop-filter: blur(16px);
   -webkit-backdrop-filter: blur(16px);
   border: 1px solid rgba(255, 45, 85, 0.4);
   color: #fff;
   font-size: 12px;
   font-weight: 700;
   cursor: pointer;
   box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
   transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
   outline: none;

   &:hover {
      background: rgba(26, 26, 32, 0.95);
      border-color: #ff2d55;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 45, 85, 0.3);
   }

   &:active {
      transform: translateY(0);
   }
`;

const PulseDot = styled.span`
   width: 8px;
   height: 8px;
   border-radius: 50%;
   background: #ff2d55;
   box-shadow: 0 0 10px #ff2d55;
   display: inline-block;
`;

const CardModal = styled.div`
   position: absolute;
   bottom: 48px;
   right: 0;
   width: 310px;
   background: rgba(22, 22, 28, 0.96);
   backdrop-filter: blur(20px);
   -webkit-backdrop-filter: blur(20px);
   border: 1px solid rgba(255, 255, 255, 0.15);
   border-radius: 18px;
   padding: 20px;
   color: #fff;
   box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
   display: ${props => (props.isOpen ? 'flex' : 'none')};
   flex-direction: column;
   gap: 14px;
   animation: fadeInSlide 0.25s ease-out;

   @keyframes fadeInSlide {
      from {
         opacity: 0;
         transform: translateY(12px) scale(0.96);
      }
      to {
         opacity: 1;
         transform: translateY(0) scale(1);
      }
   }
`;

const CardHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
   padding-bottom: 12px;
`;

const HeaderTitle = styled.div`
   display: flex;
   flex-direction: column;
`;

const CreatorName = styled.h3`
   margin: 0;
   font-size: 16px;
   font-weight: 800;
   color: #fff;
   display: flex;
   align-items: center;
   gap: 6px;
`;

const CreatorRole = styled.span`
   margin-top: 3px;
   font-size: 11px;
   color: #ff2d55;
   font-weight: 600;
   letter-spacing: 0.5px;
   text-transform: uppercase;
`;

const CloseButton = styled.button`
   background: rgba(255, 255, 255, 0.1);
   border: none;
   color: #aaa;
   font-size: 14px;
   width: 26px;
   height: 26px;
   border-radius: 50%;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: all 0.2s;

   &:hover {
      background: rgba(255, 45, 85, 0.3);
      color: #fff;
   }
`;

const CardBody = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

const BioText = styled.p`
   margin: 0;
   font-size: 12px;
   color: #bbb;
   line-height: 1.5;
`;

const ActionRow = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
   margin-top: 4px;
`;

const ActionButton = styled.a`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 14px;
   border-radius: 12px;
   background: ${props =>
      props.primary ? 'linear-gradient(135deg, #0077b5, #005582)' : 'rgba(255, 255, 255, 0.08)'};
   color: #fff;
   text-decoration: none;
   font-size: 13px;
   font-weight: 600;
   border: 1px solid rgba(255, 255, 255, 0.08);
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props =>
         props.primary ? 'linear-gradient(135deg, #0088cc, #006699)' : 'rgba(255, 45, 85, 0.25)'};
      border-color: ${props => (props.primary ? '#0077b5' : '#ff2d55')};
      transform: translateX(3px);
   }
`;

const CopyButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   padding: 10px 14px;
   border-radius: 12px;
   background: rgba(255, 255, 255, 0.08);
   color: #fff;
   font-size: 13px;
   font-weight: 600;
   border: 1px solid rgba(255, 255, 255, 0.08);
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 45, 85, 0.2);
      border-color: #ff2d55;
      transform: translateX(3px);
   }
`;

const LegalFooter = styled.div`
   font-size: 10px;
   color: #777;
   text-align: center;
   border-top: 1px solid rgba(255, 255, 255, 0.08);
   padding-top: 8px;
`;

export default class CreatorFooter extends Component {
   state = {
      isOpen: false,
      copied: false,
   };

   toggleOpen = () => {
      this.setState(prev => ({ isOpen: !prev.isOpen }));
   };

   handleCopyEmail = e => {
      e.stopPropagation();
      const email = 'vanshi@harmoniq.app';
      if (navigator.clipboard) {
         navigator.clipboard.writeText(email);
      }
      this.setState({ copied: true });
      setTimeout(() => {
         this.setState({ copied: false });
      }, 2500);
   };

   render() {
      const { isOpen, copied } = this.state;

      return (
         <WidgetContainer>
            <CardModal isOpen={isOpen}>
               <CardHeader>
                  <HeaderTitle>
                     <CreatorName>
                        VANSHI SAINI <span role="img" aria-label="verified">⭐</span>
                     </CreatorName>
                     <CreatorRole>Lead Developer & Architect</CreatorRole>
                  </HeaderTitle>
                  <CloseButton onClick={this.toggleOpen}>✕</CloseButton>
               </CardHeader>

               <CardBody>
                  <BioText>
                     Creator of <strong>Harmoniq</strong> — high-fidelity full-length music streaming, live worldwide artist discographies, and real-time synchronized lyrics.
                  </BioText>

                  <ActionRow>
                     <ActionButton
                        primary
                        href="https://www.linkedin.com/in/vanshi-saini"
                        target="_blank"
                        rel="noopener noreferrer">
                        <span>
                           <span role="img" aria-label="linkedin" style={{ marginRight: '6px' }}>💼</span>
                           LinkedIn Profile
                        </span>
                        <span>↗</span>
                     </ActionButton>

                     <CopyButton onClick={this.handleCopyEmail}>
                        <span>
                           <span role="img" aria-label="email" style={{ marginRight: '6px' }}>✉️</span>
                           {copied ? 'Email Copied!' : 'vanshi@harmoniq.app'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#ff2d55' }}>
                           {copied ? '✓' : 'Copy'}
                        </span>
                     </CopyButton>

                     <ActionButton
                        href="mailto:vanshi@harmoniq.app?subject=Inquiry%20regarding%20Harmoniq">
                        <span>
                           <span role="img" aria-label="message" style={{ marginRight: '6px' }}>💬</span>
                           Send Direct Email
                        </span>
                        <span>→</span>
                     </ActionButton>
                  </ActionRow>

                  <LegalFooter>
                     Harmoniq © 2026 VANSHI SAINI. All Rights Reserved.
                  </LegalFooter>
               </CardBody>
            </CardModal>

            <BadgePill onClick={this.toggleOpen} title="Click to view developer details">
               <PulseDot />
               <span>Developed by: VANSHI SAINI</span>
               <span style={{ fontSize: '10px', opacity: 0.8 }}>
                  {isOpen ? '✕' : '▲'}
               </span>
            </BadgePill>
         </WidgetContainer>
      );
   }
}
