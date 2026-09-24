import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../../views/actions';
import { openAuthModal } from '../../auth/actions';
import { openPreferencesModal } from '../../preferences/actions';
import { openInstallModal } from '../../install/actions';

const SidebarContainer = styled.aside`
   width: 340px;
   min-width: 280px;
   max-width: 380px;
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#121212')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};
   border-radius: 8px;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   margin-bottom: 8px;
   margin-left: 8px;
   height: calc(100% - 8px);
   transition: background 0.25s ease;

   @media screen and (max-width: 900px) {
      display: none;
   }
`;

const LibraryHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 18px 20px;
`;

const HeaderTitle = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   color: ${props => (props.themeMode === 'light' ? '#374151' : '#b3b3b3')};
   font-size: 16px;
   font-weight: 700;
   cursor: pointer;
   transition: color 0.2s ease;

   &:hover {
      color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   }
`;

const CreateButton = styled.button`
   background: ${props => (props.themeMode === 'light' ? '#e5e7eb' : '#1f1f1f')};
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   font-size: 13px;
   font-weight: 700;
   padding: 6px 14px;
   border-radius: 20px;
   display: flex;
   align-items: center;
   gap: 6px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.themeMode === 'light' ? '#d1d5db' : '#2a2a2a')};
      transform: scale(1.04);
   }

   &:active {
      transform: scale(0.96);
   }
`;

const ScrollContent = styled.div`
   flex: 1;
   overflow-y: auto;
   padding: 0 12px 16px 12px;
   display: flex;
   flex-direction: column;
   gap: 16px;

   &::-webkit-scrollbar {
      width: 8px;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
   }
`;

const ActionCard = styled.div`
   background: ${props => (props.themeMode === 'light' ? '#f3f4f6' : '#1f1f1f')};
   border-radius: 8px;
   padding: 18px 20px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 8px;
`;

const CardHeading = styled.h4`
   margin: 0;
   font-size: 15px;
   font-weight: 700;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const CardSubtext = styled.p`
   margin: 0 0 8px 0;
   font-size: 13px;
   color: ${props => (props.themeMode === 'light' ? '#4b5563' : '#b3b3b3')};
   line-height: 1.4;
`;

const WhitePillButton = styled.button`
   background: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   color: ${props => (props.themeMode === 'light' ? '#ffffff' : '#000000')};
   border: none;
   border-radius: 9999px;
   padding: 8px 18px;
   font-size: 13px;
   font-weight: 800;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.themeMode === 'light' ? '#1f2937' : '#f0f0f0')};
      transform: scale(1.04);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const DevCard = styled(ActionCard)`
   background: linear-gradient(135deg, #181822 0%, #111116 100%);
   border: 1px solid rgba(255, 255, 255, 0.08);
`;

const DevBadge = styled.span`
   font-size: 10px;
   font-weight: 800;
   color: #1ed760;
   letter-spacing: 1px;
   text-transform: uppercase;
`;

const DevButton = styled.a`
   background: rgba(255, 255, 255, 0.1);
   color: #ffffff;
   border: 1px solid rgba(255, 255, 255, 0.15);
   border-radius: 9999px;
   padding: 8px 16px;
   font-size: 12px;
   font-weight: 700;
   text-decoration: none;
   cursor: pointer;
   display: inline-flex;
   align-items: center;
   gap: 6px;
   transition: all 0.2s ease;

   &:hover {
      background: #1ed760;
      color: #000000;
      border-color: #1ed760;
      transform: scale(1.03);
   }
`;

const SidebarFooter = styled.div`
   padding: 16px 20px;
   display: flex;
   flex-direction: column;
   gap: 16px;
`;

const LegalLinks = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 10px 14px;
`;

const LegalLink = styled.a`
   color: #b3b3b3;
   font-size: 11px;
   text-decoration: none;
   cursor: pointer;

   &:hover {
      text-decoration: underline;
      color: #ffffff;
   }
`;

const LangButton = styled.button`
   align-self: flex-start;
   background: transparent;
   border: 1px solid rgba(255, 255, 255, 0.3);
   border-radius: 9999px;
   color: #ffffff;
   font-size: 13px;
   font-weight: 700;
   padding: 6px 14px;
   display: flex;
   align-items: center;
   gap: 6px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      border-color: #ffffff;
      transform: scale(1.03);
   }
`;

const Watermark = styled.div`
   font-size: 10px;
   color: #666;
   margin-top: 4px;
`;

class Sidebar extends Component {
   handleCreatePlaylist = () => {
      const { authState, openAuthModal, pushView } = this.props;
      if (!authState.isAuthenticated) {
         openAuthModal('signup');
      } else {
         pushView({
            name: 'Playlists',
            title: 'Playlists',
            props: {},
         });
      }
   };

   render() {
      const { pushView, themeState } = this.props;
      const themeMode = (themeState && themeState.theme) || 'dark';

      return (
         <SidebarContainer themeMode={themeMode}>
            <LibraryHeader>
               <HeaderTitle
                  themeMode={themeMode}
                  onClick={() =>
                     pushView({
                        name: 'Library',
                        title: 'Library',
                        props: { hideTitle: true },
                     })
                  }>
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                     <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1.5-.866zM20 20h-4V4h4v16zM7.5 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1z" />
                  </svg>
                  <span>Your Library</span>
               </HeaderTitle>

               <CreateButton
                  themeMode={themeMode}
                  onClick={this.handleCreatePlaylist}>
                  <span>＋</span> Create
               </CreateButton>
            </LibraryHeader>

            <ScrollContent>
               <ActionCard themeMode={themeMode}>
                  <CardHeading themeMode={themeMode}>Create your first playlist</CardHeading>
                  <CardSubtext themeMode={themeMode}>It's easy, we'll help you</CardSubtext>
                  <WhitePillButton
                     themeMode={themeMode}
                     onClick={this.handleCreatePlaylist}>
                     Create playlist
                  </WhitePillButton>
               </ActionCard>

               <ActionCard themeMode={themeMode}>
                  <CardHeading themeMode={themeMode}>Browse world-class artists</CardHeading>
                  <CardSubtext themeMode={themeMode}>
                     Over 60+ curated legends and full studio discographies
                  </CardSubtext>
                  <WhitePillButton
                     themeMode={themeMode}
                     onClick={() =>
                        pushView({
                           name: 'Artists',
                           title: 'Artists',
                           props: {},
                        })
                     }>
                     Browse artists
                  </WhitePillButton>
               </ActionCard>

               <ActionCard themeMode={themeMode}>
                  <CardHeading themeMode={themeMode}>Your Music Preferences</CardHeading>
                  <CardSubtext themeMode={themeMode}>
                     Write your tastes, favorite artists, and custom vibes
                  </CardSubtext>
                  <WhitePillButton
                     themeMode={themeMode}
                     onClick={this.props.openPreferencesModal}>
                     <span role="img" aria-label="gear">⚙️</span> Set Preferences
                  </WhitePillButton>
               </ActionCard>

               <ActionCard themeMode={themeMode}>
                  <CardHeading themeMode={themeMode}>Install Harmoniq App</CardHeading>
                  <CardSubtext themeMode={themeMode}>
                     Fast standalone desktop app, offline caching, and mobile QR code
                  </CardSubtext>
                  <WhitePillButton
                     themeMode={themeMode}
                     onClick={this.props.openInstallModal}>
                     <span role="img" aria-label="download">⬇️</span> Install App
                  </WhitePillButton>
               </ActionCard>

               <DevCard>
                  <DevBadge>Lead Architect</DevBadge>
                  <CardHeading>Developed by: VANSHI SAINI</CardHeading>
                  <CardSubtext>
                     Full-length 320kbps audio engine, DES decryption, LRCLIB synchronized lyrics.
                  </CardSubtext>
                  <DevButton
                     href="https://www.linkedin.com/in/vanshi-saini"
                     target="_blank"
                     rel="noopener noreferrer">
                     <span role="img" aria-label="briefcase">💼</span> Connect on LinkedIn
                  </DevButton>
               </DevCard>
            </ScrollContent>

            <SidebarFooter>
               <LegalLinks>
                  <LegalLink href="#legal">Legal</LegalLink>
                  <LegalLink href="#safety">Safety & Privacy Center</LegalLink>
                  <LegalLink href="#privacy">Privacy Policy</LegalLink>
                  <LegalLink href="#cookies">Cookies</LegalLink>
                  <LegalLink href="#ads">About Ads</LegalLink>
                  <LegalLink href="#accessibility">Accessibility</LegalLink>
               </LegalLinks>

               <LangButton onClick={this.props.openPreferencesModal} title="Music Languages & Preferences">
                  <span role="img" aria-label="globe">🌐</span> Language & Preferences
               </LangButton>

               <Watermark>Harmoniq v2.0 • Developed by VANSHI SAINI</Watermark>
            </SidebarFooter>
         </SidebarContainer>
      );
   }
}

const mapStateToProps = state => ({
   authState: state.authState,
   themeState: state.themeState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(pushView(view)),
   openAuthModal: tab => dispatch(openAuthModal(tab)),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
   openInstallModal: () => dispatch(openInstallModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
