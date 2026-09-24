import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
   closeAuthModal,
   setAuthTab,
   loginUser,
   signupUser,
   loginAsDeveloper,
} from '../../auth/actions';

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.75);
   backdrop-filter: blur(8px);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 10000;
   padding: 16px;
   animation: fadeIn 0.2s ease-out;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

const ModalCard = styled.div`
   width: 100%;
   max-width: 440px;
   background: #121212;
   border-radius: 14px;
   padding: 32px 28px;
   box-shadow: 0 24px 48px rgba(0, 0, 0, 0.8);
   border: 1px solid rgba(255, 255, 255, 0.1);
   position: relative;
   animation: slideUp 0.25s ease-out;

   @keyframes slideUp {
      from {
         opacity: 0;
         transform: translateY(16px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }

   @media screen and (max-width: 480px) {
      padding: 24px 20px;
   }
`;

const CloseButton = styled.button`
   position: absolute;
   top: 18px;
   right: 18px;
   background: transparent;
   border: none;
   color: #b3b3b3;
   font-size: 22px;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 32px;
   height: 32px;
   border-radius: 50%;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
   }
`;

const HeaderSection = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   margin-bottom: 24px;
`;

const BrandIcon = styled.div`
   width: 48px;
   height: 48px;
   border-radius: 50%;
   background: #1ed760;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 26px;
   margin-bottom: 12px;
   box-shadow: 0 4px 16px rgba(30, 215, 96, 0.4);
`;

const ModalTitle = styled.h2`
   margin: 0;
   font-size: 24px;
   font-weight: 800;
   color: #fff;
   letter-spacing: -0.4px;
`;

const ModalSubtitle = styled.p`
   margin: 6px 0 0 0;
   font-size: 13px;
   color: #b3b3b3;
`;

const TabContainer = styled.div`
   display: flex;
   background: #242424;
   border-radius: 8px;
   padding: 4px;
   margin-bottom: 20px;
`;

const TabButton = styled.button`
   flex: 1;
   padding: 10px;
   background: ${props => (props.active ? '#333333' : 'transparent')};
   color: ${props => (props.active ? '#ffffff' : '#b3b3b3')};
   border: none;
   border-radius: 6px;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      color: #fff;
   }
`;

const QuickDevButton = styled.button`
   width: 100%;
   padding: 12px;
   background: linear-gradient(135deg, #1db954 0%, #15883e 100%);
   color: #fff;
   border: none;
   border-radius: 24px;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 8px;
   margin-bottom: 20px;
   box-shadow: 0 4px 14px rgba(29, 185, 84, 0.35);
   transition: all 0.2s ease;

   &:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 18px rgba(29, 185, 84, 0.5);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const Divider = styled.div`
   display: flex;
   align-items: center;
   text-align: center;
   color: #727272;
   font-size: 12px;
   font-weight: 600;
   margin-bottom: 20px;

   &::before,
   &::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
   }

   span {
      padding: 0 10px;
   }
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 14px;
`;

const FormGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 6px;
`;

const Label = styled.label`
   font-size: 12px;
   font-weight: 700;
   color: #fff;
   letter-spacing: 0.2px;
`;

const Input = styled.input`
   padding: 12px 14px;
   background: #242424;
   border: 1px solid rgba(255, 255, 255, 0.15);
   border-radius: 6px;
   color: #fff;
   font-size: 14px;
   outline: none;
   transition: all 0.2s ease;

   &:focus {
      border-color: #1ed760;
      background: #2a2a2a;
      box-shadow: 0 0 0 1px #1ed760;
   }

   &::placeholder {
      color: #727272;
   }
`;

const SubmitButton = styled.button`
   margin-top: 10px;
   padding: 13px;
   background: #1ed760;
   color: #000;
   border: none;
   border-radius: 24px;
   font-size: 14px;
   font-weight: 800;
   letter-spacing: 0.5px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: #1fdf64;
      transform: scale(1.02);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const ErrorAlert = styled.div`
   padding: 10px 14px;
   background: rgba(235, 87, 87, 0.15);
   border: 1px solid #eb5757;
   border-radius: 6px;
   color: #ff7575;
   font-size: 12px;
   margin-bottom: 12px;
   display: flex;
   align-items: center;
   gap: 8px;
`;

class AuthModal extends Component {
   state = {
      loginIdentifier: '',
      loginPassword: '',
      signupName: '',
      signupEmail: '',
      signupPassword: '',
      error: '',
   };

   handleLogin = e => {
      e.preventDefault();
      const { loginIdentifier, loginPassword } = this.state;
      const res = this.props.loginUser({
         identifier: loginIdentifier,
         password: loginPassword,
      });
      if (res && !res.success) {
         this.setState({ error: res.error });
      } else {
         this.setState({ error: '' });
      }
   };

   handleSignup = e => {
      e.preventDefault();
      const { signupName, signupEmail, signupPassword } = this.state;
      const res = this.props.signupUser({
         name: signupName,
         email: signupEmail,
         password: signupPassword,
      });
      if (res && !res.success) {
         this.setState({ error: res.error });
      } else {
         this.setState({ error: '' });
      }
   };

   render() {
      const { isModalOpen, modalTab, closeAuthModal, setAuthTab, loginAsDeveloper } =
         this.props;
      const { error } = this.state;

      if (!isModalOpen) return null;

      const isLogin = modalTab === 'login';

      return (
         <ModalBackdrop onClick={closeAuthModal}>
            <ModalCard onClick={e => e.stopPropagation()}>
               <CloseButton onClick={closeAuthModal} title="Close">
                  ✕
               </CloseButton>

               <HeaderSection>
                  <BrandIcon>
                     <span role="img" aria-label="logo">🎵</span>
                  </BrandIcon>
                  <ModalTitle>
                     {isLogin ? 'Log in to Harmoniq' : 'Sign up for free'}
                  </ModalTitle>
                  <ModalSubtitle>
                     {isLogin
                        ? 'Unlimited full music streams & synced karaoke lyrics'
                        : 'Discover 60+ artists and complete studio discographies'}
                  </ModalSubtitle>
               </HeaderSection>

               <TabContainer>
                  <TabButton
                     type="button"
                     active={isLogin}
                     onClick={() => {
                        this.setState({ error: '' });
                        setAuthTab('login');
                     }}>
                     Log In
                  </TabButton>
                  <TabButton
                     type="button"
                     active={!isLogin}
                     onClick={() => {
                        this.setState({ error: '' });
                        setAuthTab('signup');
                     }}>
                     Sign Up
                  </TabButton>
               </TabContainer>

               <QuickDevButton type="button" onClick={loginAsDeveloper}>
                  <span role="img" aria-label="lightning">⚡</span> 1-Click Quick Login as VANSHI SAINI
               </QuickDevButton>

               <Divider>
                  <span>or with email</span>
               </Divider>

               {error && (
                  <ErrorAlert>
                     <span role="img" aria-label="warning">⚠️</span> {error}
                  </ErrorAlert>
               )}

               {isLogin ? (
                  <Form onSubmit={this.handleLogin}>
                     <FormGroup>
                        <Label>Email or username</Label>
                        <Input
                           type="text"
                           placeholder="Email or username"
                           value={this.state.loginIdentifier}
                           onChange={e =>
                              this.setState({ loginIdentifier: e.target.value })
                           }
                           required
                        />
                     </FormGroup>

                     <FormGroup>
                        <Label>Password</Label>
                        <Input
                           type="password"
                           placeholder="Password"
                           value={this.state.loginPassword}
                           onChange={e =>
                              this.setState({ loginPassword: e.target.value })
                           }
                           required
                        />
                     </FormGroup>

                     <SubmitButton type="submit">Log In</SubmitButton>
                  </Form>
               ) : (
                  <Form onSubmit={this.handleSignup}>
                     <FormGroup>
                        <Label>What should we call you?</Label>
                        <Input
                           type="text"
                           placeholder="Enter your name"
                           value={this.state.signupName}
                           onChange={e =>
                              this.setState({ signupName: e.target.value })
                           }
                           required
                        />
                     </FormGroup>

                     <FormGroup>
                        <Label>What's your email?</Label>
                        <Input
                           type="email"
                           placeholder="Enter your email address"
                           value={this.state.signupEmail}
                           onChange={e =>
                              this.setState({ signupEmail: e.target.value })
                           }
                           required
                        />
                     </FormGroup>

                     <FormGroup>
                        <Label>Create a password</Label>
                        <Input
                           type="password"
                           placeholder="Create a password"
                           value={this.state.signupPassword}
                           onChange={e =>
                              this.setState({ signupPassword: e.target.value })
                           }
                           required
                        />
                     </FormGroup>

                     <SubmitButton type="submit">Sign Up</SubmitButton>
                  </Form>
               )}
            </ModalCard>
         </ModalBackdrop>
      );
   }
}

const mapStateToProps = state => ({
   isModalOpen: state.authState.isModalOpen,
   modalTab: state.authState.modalTab,
});

const mapDispatchToProps = dispatch => ({
   closeAuthModal: () => dispatch(closeAuthModal()),
   setAuthTab: tab => dispatch(setAuthTab(tab)),
   loginUser: creds => dispatch(loginUser(creds)),
   signupUser: data => dispatch(signupUser(data)),
   loginAsDeveloper: () => dispatch(loginAsDeveloper()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
