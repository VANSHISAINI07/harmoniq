import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants } from '../toolbox';
import * as Views from './';
import SpotifyFooter from '../components/spotify/SpotifyFooter';

const { animation } = constants;
const { slideInFromRight, slideOutToRight } = animation;

const Container = styled.div`
   position: relative;
   flex: 1;
   height: calc(100% - 8px);
   margin: 0 8px 8px 0;
   border-radius: 8px;
   background: ${props => (props.themeMode === 'light' ? '#fbfbfd' : '#121212')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};
   overflow: hidden;
   transition: background 0.25s ease;

   @media screen and (max-width: 900px) {
      margin: 0 8px 8px 8px;
   }
`;

const PageContainer = styled.div`
   z-index: ${props => (props.secondFromTop ? 0 : 1)};
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   padding: 0 28px;
   background: ${props => (props.themeMode === 'light' ? '#fbfbfd' : '#121212')};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   transform: ${props =>
      props.secondFromTop && !props.becomingTop ? 'translateX(-20%)' : null};
   overflow-y: ${props => (props.secondFromTop ? 'hidden' : 'auto')};
   animation: ${props =>
      props.exiting ? slideOutToRight : slideInFromRight} 0.3s ease-in-out;
   transition: background 0.25s ease, color 0.25s ease, transform 0.3s ease-in-out;
   -webkit-overflow-scrolling: touch;

   &::-webkit-scrollbar {
      width: 10px;
   }

   &::-webkit-scrollbar-track {
      background: transparent;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4);
   }

   @media screen and (max-width: 600px) {
      padding: 0 16px;
   }
`;

const mapStateToProps = state => ({
   viewState: state.viewState,
   themeState: state.themeState,
});

const ViewStack = connect(mapStateToProps)(({ stack, exiting, themeState }) => {
   const themeMode = (themeState && themeState.theme) || 'dark';

   return stack.map(({ name, props }, index) => {
      const View = Views[name];
      const secondFromTop = index !== stack.length - 1;

      try {
         return (
            <PageContainer
               key={`page-${index}`}
               themeMode={themeMode}
               secondFromTop={secondFromTop}
               becomingTop={exiting && index === stack.length - 2}
               exiting={exiting && index === stack.length - 1}>
               <View {...props} />
               <SpotifyFooter />
            </PageContainer>
         );
      } catch (e) {
         console.error('Error: This view is empty: ', View);
         return null;
      }
   });
});

class ViewContainer extends Component {
   constructor(props) {
      super(props);
      const { viewState } = props;
      const { stack } = viewState;

      this.state = {
         stack,
         newStack: null,
         exiting: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { stack } = viewState;
      const exiting = stack.length < prevState.stack.length;

      return {
         stack: exiting ? prevState.stack : stack,
         exiting,
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { stack } = viewState;

      setTimeout(() => {
         this.setState({
            stack,
            exiting: false,
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.exiting) {
         this.animateBack();
      }
   }

   render() {
      const { stack, exiting } = this.state;
      const { themeState } = this.props;
      const themeMode = (themeState && themeState.theme) || 'dark';

      return (
         <Container themeMode={themeMode}>
            <ViewStack stack={stack} exiting={exiting} />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);