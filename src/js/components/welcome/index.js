import React, { Component } from 'react';
import styled from 'styled-components';
import { constants } from '../../toolbox';

const { animation } = constants;

const Container = styled.div`
   z-index: 200;
   position: fixed;
   display: ${props => (props.isOpen ? 'flex' : 'none')};
   flex-direction: column;
   justify-content: center;
   align-items: center;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: #0b0b0e;
   color: #fff;
   animation: ${props => (props.isClosing ? animation.fadeOut : null)} 0.4s ease;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const SplashCard = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   padding: 24px;
   animation: ${props => (props.isClosing ? animation.scaleOut : 'splashIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)')};

   @keyframes splashIn {
      from {
         opacity: 0;
         transform: scale(0.88) translateY(10px);
      }
      to {
         opacity: 1;
         transform: scale(1) translateY(0);
      }
   }
`;

const SoundWaveIcon = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 5px;
   height: 52px;
   margin-bottom: 20px;
`;

const WaveBar = styled.div`
   width: 6px;
   height: ${props => props.height || '24px'};
   background: linear-gradient(180deg, #ff2d55 0%, #ff5252 100%);
   border-radius: 4px;
   box-shadow: 0 0 12px rgba(255, 45, 85, 0.5);
   animation: wavePulse ${props => props.duration || '1s'} ease-in-out infinite alternate;
   animation-delay: ${props => props.delay || '0s'};

   @keyframes wavePulse {
      0% {
         height: 12px;
         opacity: 0.5;
      }
      100% {
         height: ${props => props.maxHeight || '48px'};
         opacity: 1;
      }
   }
`;

const AppTitle = styled.h1`
   margin: 0 0 8px;
   font-size: 38px;
   font-weight: 900;
   letter-spacing: 3px;
   background: linear-gradient(135deg, #ffffff 30%, #ff2d55 100%);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   text-transform: uppercase;
`;

const DeveloperCredit = styled.div`
   margin-top: 6px;
   padding: 6px 16px;
   border-radius: 20px;
   background: rgba(255, 45, 85, 0.12);
   border: 1px solid rgba(255, 45, 85, 0.3);
   font-size: 14px;
   font-weight: 700;
   color: #ff2d55;
   letter-spacing: 0.5px;
   display: flex;
   align-items: center;
   gap: 6px;
   box-shadow: 0 4px 20px rgba(255, 45, 85, 0.15);
   animation: fadeIn 0.4s ease;

   @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
   }
`;

const Subtitle = styled.p`
   margin: 14px 0 0;
   font-size: 13px;
   color: #888;
   font-weight: 500;
   letter-spacing: 0.5px;
`;

export default class WelcomScreen extends Component {
   state = {
      isOpen: true,
      isClosing: false,
   };

   componentDidMount() {
      // Smooth splash timing: display for 1.8s, then smoothly dissolve
      setTimeout(() => {
         this.setState({ isClosing: true });
      }, 1800);

      setTimeout(() => {
         this.setState({
            isClosing: false,
            isOpen: false,
         });
      }, 2200);
   }

   render() {
      const { isOpen, isClosing } = this.state;

      return (
         <Container isOpen={isOpen || isClosing} isClosing={isClosing}>
            <SplashCard isClosing={isClosing}>
               <SoundWaveIcon>
                  <WaveBar height="18px" maxHeight="32px" duration="0.8s" delay="0s" />
                  <WaveBar height="32px" maxHeight="48px" duration="0.9s" delay="0.15s" />
                  <WaveBar height="44px" maxHeight="52px" duration="0.7s" delay="0.3s" />
                  <WaveBar height="28px" maxHeight="42px" duration="1s" delay="0.1s" />
                  <WaveBar height="16px" maxHeight="30px" duration="0.85s" delay="0.25s" />
               </SoundWaveIcon>

               <AppTitle>Harmoniq</AppTitle>

               <DeveloperCredit>
                  <span role="img" aria-label="sparkles">✨</span>
                  Developed by: VANSHI SAINI
               </DeveloperCredit>

               <Subtitle>
                  High-Fidelity Audio & Synchronized Lyrics
               </Subtitle>
            </SplashCard>
         </Container>
      );
   }
}
