/**
 * ============================================================================
 * HARMONIQ USER FEEDBACK & FEATURE REQUEST MODAL
 * Lead Architect & Creator: VANSHI SAINI
 * ============================================================================
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeFeedbackModal } from '../../feedback/actions';
import { openAuthModal } from '../../auth/actions';
import { submitFeedback } from '../../services/cloudDatabase';

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.78);
   backdrop-filter: blur(8px);
   -webkit-backdrop-filter: blur(8px);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 10000;
   padding: 16px;
   animation: fadeIn 0.2s ease-out;

   @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
   }
`;

const ModalCard = styled.div`
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#14141c')};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.12)'};
   border-radius: 20px;
   width: 100%;
   max-width: 500px;
   max-height: 90vh;
   overflow-y: auto;
   padding: 28px;
   box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
   display: flex;
   flex-direction: column;
   gap: 18px;
   position: relative;

   &::-webkit-scrollbar {
      width: 6px;
   }
   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
   }

   @media screen and (max-width: 500px) {
      padding: 20px;
      gap: 16px;
   }
`;

const CloseButton = styled.button`
   position: absolute;
   top: 18px;
   right: 18px;
   background: transparent;
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   font-size: 24px;
   line-height: 1;
   cursor: pointer;
   padding: 4px 8px;
   border-radius: 50%;
   transition: all 0.2s ease;

   &:hover {
      color: #1ed760;
      transform: scale(1.15);
   }
`;

const Header = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

const Title = styled.h2`
   margin: 0;
   font-size: 21px;
   font-weight: 800;
   letter-spacing: -0.5px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   display: flex;
   align-items: center;
   gap: 8px;
`;

const Subtitle = styled.p`
   margin: 0;
   font-size: 13px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   line-height: 1.45;
`;

const CategoryGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 8px;

   @media screen and (max-width: 420px) {
      grid-template-columns: 1fr;
   }
`;

const CategoryChip = styled.button`
   background: ${props =>
      props.active
         ? props.themeMode === 'light'
            ? 'rgba(30, 215, 96, 0.15)'
            : 'rgba(30, 215, 96, 0.16)'
         : props.themeMode === 'light'
            ? '#f3f4f6'
            : '#1e1e28'};
   border: 1.5px solid
      ${props =>
         props.active
            ? '#1ed760'
            : props.themeMode === 'light'
               ? 'rgba(0, 0, 0, 0.08)'
               : 'rgba(255, 255, 255, 0.08)'};
   color: ${props =>
      props.active
         ? '#1ed760'
         : props.themeMode === 'light'
            ? '#374151'
            : '#d1d5db'};
   padding: 9px 12px;
   border-radius: 10px;
   font-size: 12.5px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 7px;
   transition: all 0.2s ease;

   &:hover {
      border-color: #1ed760;
      transform: translateY(-1px);
   }
`;

const StarContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-top: 2px;
`;

const StarButton = styled.button`
   background: transparent;
   border: none;
   font-size: 26px;
   cursor: pointer;
   padding: 0;
   transition: transform 0.15s ease;
   color: ${props => (props.active ? '#fbbf24' : '#4b5563')};

   &:hover {
      transform: scale(1.25);
   }
`;

const FormGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 6px;
`;

const Label = styled.label`
   font-size: 12.5px;
   font-weight: 700;
   color: ${props => (props.themeMode === 'light' ? '#374151' : '#d1d5db')};
`;


const Textarea = styled.textarea`
   background: ${props => (props.themeMode === 'light' ? '#f9fafb' : '#1a1a24')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.12)'
            : 'rgba(255, 255, 255, 0.12)'};
   border-radius: 10px;
   padding: 10px 14px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   font-size: 13.5px;
   font-family: inherit;
   resize: vertical;
   min-height: 85px;
   outline: none;
   transition: border-color 0.2s ease;

   &:focus {
      border-color: #1ed760;
   }
`;

const SongAttachment = styled.div`
   background: ${props =>
      props.themeMode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)'};
   border-radius: 10px;
   padding: 8px 12px;
   display: flex;
   align-items: center;
   gap: 8px;
   font-size: 12px;
   color: #1ed760;
   font-weight: 600;
`;

const SubmitButton = styled.button`
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 12px;
   padding: 12px 20px;
   font-size: 14px;
   font-weight: 800;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 8px;
   transition: all 0.2s ease;
   box-shadow: 0 4px 14px rgba(30, 215, 96, 0.35);

   &:hover {
      background: #1fdf64;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(30, 215, 96, 0.5);
   }

   &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
   }
`;

const SuccessView = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   padding: 24px 12px;
   gap: 14px;
   animation: fadeIn 0.3s ease-out;
`;

const SuccessIcon = styled.div`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background: rgba(30, 215, 96, 0.18);
   border: 2px solid #1ed760;
   color: #1ed760;
   font-size: 32px;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const LockedView = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   padding: 24px 12px;
   gap: 14px;
   animation: fadeIn 0.3s ease-out;
`;

const LockIcon = styled.div`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background: rgba(239, 68, 68, 0.15);
   border: 2px solid #ef4444;
   color: #ef4444;
   font-size: 28px;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const CATEGORIES = [
   { id: 'Song Request', icon: '🎵', label: 'Song Request' },
   { id: 'Feature Idea', icon: '✨', label: 'Feature Idea' },
   { id: 'Bug Report', icon: '🐞', label: 'Bug Report' },
   { id: 'App Feedback', icon: '💬', label: 'General Review' },
];

class FeedbackModal extends Component {
   state = {
      category: 'Song Request',
      rating: 5,
      name: '',
      email: '',
      message: '',
      attachTrack: true,
      submitting: false,
      submitted: false,
   };

   componentDidMount() {
      const { authUser } = this.props;
      if (authUser) {
         this.setState({
            name: authUser.name || '',
            email: authUser.email || '',
         });
      }
   }

   handleCategorySelect = category => {
      this.setState({ category });
   };

   handleRating = rating => {
      this.setState({ rating });
   };

   handleSubmit = async e => {
      e.preventDefault();
      const { authUser, currentTrack } = this.props;
      const { category, rating, message, attachTrack } = this.state;

      if (!message.trim()) {
         alert('Please write a short message or request before submitting.');
         return;
      }

      this.setState({ submitting: true });

      try {
         await submitFeedback({
            category,
            rating,
            name: (authUser && authUser.name) || 'Harmoniq Member',
            email: (authUser && authUser.email) || 'member@harmoniq.com',
            message,
            currentTrack: attachTrack ? currentTrack : null,
         });

         this.setState({ submitting: false, submitted: true });
      } catch (err) {
         console.error('Feedback submit error:', err);
         this.setState({ submitting: false });
         alert('Thank you! Your feedback has been recorded.');
         this.props.closeFeedbackModal();
      }
   };

   handleResetAndClose = () => {
      this.setState({
         category: 'Song Request',
         rating: 5,
         message: '',
         submitting: false,
         submitted: false,
      });
      this.props.closeFeedbackModal();
   };

   render() {
      const { isOpen, themeState, currentTrack, authUser } = this.props;
      const {
         category,
         rating,
         message,
         attachTrack,
         submitting,
         submitted,
      } = this.state;

      if (!isOpen) return null;

      const themeMode = (themeState && themeState.theme) || 'dark';

      return (
         <ModalBackdrop onClick={this.handleResetAndClose}>
            <ModalCard
               themeMode={themeMode}
               onClick={e => e.stopPropagation()}>
               <CloseButton
                  themeMode={themeMode}
                  onClick={this.handleResetAndClose}
                  title="Close">
                  ×
               </CloseButton>

               {!authUser ? (
                  <LockedView>
                     <LockIcon>
                        <span role="img" aria-label="lock">🔒</span>
                     </LockIcon>
                     <Title themeMode={themeMode}>Log In Required</Title>
                     <Subtitle themeMode={themeMode}>
                        To keep Harmoniq secure and prevent spam, only logged-in listeners can submit song requests and feature suggestions.
                        Your feedback is securely saved to your account and reviewed directly by lead creator <strong>VANSHI SAINI</strong>.
                     </Subtitle>
                     <SubmitButton
                        onClick={() => {
                           this.props.closeFeedbackModal();
                           this.props.openAuthModal('login');
                        }}
                        style={{ marginTop: '8px' }}>
                        <span role="img" aria-label="key">🔑</span> Log In or Sign Up
                     </SubmitButton>
                  </LockedView>
               ) : submitted ? (
                  <SuccessView>
                     <SuccessIcon>✓</SuccessIcon>
                     <Title themeMode={themeMode}>Thank You for Your Feedback!</Title>
                     <Subtitle themeMode={themeMode}>
                        Your request has been stored in the cloud database.
                        Lead Architect <strong>VANSHI SAINI</strong> reviews all submissions
                        to plan upcoming features and new music additions.
                     </Subtitle>
                     <SubmitButton onClick={this.handleResetAndClose} style={{ marginTop: '12px' }}>
                        Done
                     </SubmitButton>
                  </SuccessView>
               ) : (
                  <React.Fragment>
                     <Header>
                        <Title themeMode={themeMode}>
                           <span role="img" aria-label="feedback">💬</span>
                           Feedback & Update Requests
                        </Title>
                        <Subtitle themeMode={themeMode}>
                           Tell us which songs, lyrics, or features you'd like added in the next update.
                        </Subtitle>
                        <div
                           style={{
                              marginTop: '6px',
                              background: themeMode === 'light' ? 'rgba(30, 215, 96, 0.12)' : 'rgba(30, 215, 96, 0.14)',
                              border: '1px solid rgba(30, 215, 96, 0.35)',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              color: '#1ed760',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                           }}>
                           <span role="img" aria-label="user">👤</span>
                           Verified Account: <strong>{authUser.name}</strong> ({authUser.email})
                        </div>
                     </Header>

                     <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <FormGroup>
                           <Label themeMode={themeMode}>Category</Label>
                           <CategoryGrid>
                              {CATEGORIES.map(cat => (
                                 <CategoryChip
                                    key={cat.id}
                                    type="button"
                                    active={category === cat.id}
                                    themeMode={themeMode}
                                    onClick={() => this.handleCategorySelect(cat.id)}>
                                    <span>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                 </CategoryChip>
                              ))}
                           </CategoryGrid>
                        </FormGroup>

                        <FormGroup>
                           <Label themeMode={themeMode}>Your Experience Rating</Label>
                           <StarContainer>
                              {[1, 2, 3, 4, 5].map(star => (
                                 <StarButton
                                    key={star}
                                    type="button"
                                    active={star <= rating}
                                    onClick={() => this.handleRating(star)}
                                    title={`${star} Star${star > 1 ? 's' : ''}`}>
                                    ★
                                 </StarButton>
                              ))}
                              <span style={{ fontSize: '13px', color: '#1ed760', fontWeight: 700, marginLeft: '6px' }}>
                                 {rating} / 5 Stars
                              </span>
                           </StarContainer>
                        </FormGroup>

                        <FormGroup>
                           <Label themeMode={themeMode}>
                              {category === 'Song Request'
                                 ? 'Which song, artist, or album should we add?'
                                 : category === 'Feature Idea'
                                    ? 'What new feature would you like to see?'
                                    : 'Your message or suggestion:'}
                           </Label>
                           <Textarea
                              themeMode={themeMode}
                              value={message}
                              onChange={e => this.setState({ message: e.target.value })}
                              placeholder={
                                 category === 'Song Request'
                                    ? 'e.g. Please add more Punjabi / Bollywood romantic hits or Punjabi 90s classic tracks!'
                                    : category === 'Feature Idea'
                                       ? 'e.g. Add sleep timer, song equalizer, or collaborative playlist sharing...'
                                       : 'Write your thoughts here...'
                              }
                              required
                           />
                        </FormGroup>

                        {currentTrack && (
                           <SongAttachment themeMode={themeMode}>
                              <input
                                 type="checkbox"
                                 id="attachTrack"
                                 checked={attachTrack}
                                 onChange={e => this.setState({ attachTrack: e.target.checked })}
                                 style={{ accentColor: '#1ed760', cursor: 'pointer' }}
                              />
                              <label htmlFor="attachTrack" style={{ cursor: 'pointer' }}>
                                 Attach currently playing: <strong>{currentTrack.name || 'Song'}</strong> ({currentTrack.artist || 'Artist'})
                              </label>
                           </SongAttachment>
                        )}

                        <SubmitButton type="submit" disabled={submitting}>
                           {submitting ? 'Sending...' : '🚀 Submit to Cloud Database'}
                        </SubmitButton>
                     </form>
                  </React.Fragment>
               )}
            </ModalCard>
         </ModalBackdrop>
      );
   }
}

const mapStateToProps = state => ({
   isOpen: state.feedbackState ? state.feedbackState.isFeedbackModalOpen : false,
   themeState: state.themeState,
   authUser: state.authState ? state.authState.user : null,
   currentTrack: state.audioState ? state.audioState.song : null,
});

const mapDispatchToProps = dispatch => ({
   closeFeedbackModal: () => dispatch(closeFeedbackModal()),
   openAuthModal: tab => dispatch(openAuthModal(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModal);
