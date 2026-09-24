import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WelcomeScreen from './components/welcome';
import ViewContainer from './views/view_container';
import PopupContainer from './popups';
import TopNav from './components/spotify/TopNav';
import Sidebar from './components/spotify/Sidebar';
import SpotifyPlayerBar from './components/spotify/SpotifyPlayerBar';
import PreviewBanner from './components/spotify/PreviewBanner';
import AuthModal from './components/auth/AuthModal';
import SongNotesModal from './components/notes/SongNotesModal';
import NotificationPanel from './components/notifications/NotificationPanel';
import InstallModal from './components/install/InstallModal';
import PreferencesModal from './components/preferences/PreferencesModal';
import FeedbackModal from './components/feedback/FeedbackModal';
import AdminDashboardModal from './components/admin/AdminDashboardModal';
import MobileDock from './components/mobile/MobileDock';
import MobileHeader from './components/mobile/MobileHeader';
import { setDeferredPrompt } from './install/actions';
import { trackAppConnection } from './services/cloudDatabase';

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   flex-direction: column;
   background: ${props => (props.themeMode === 'light' ? '#f4f5f7' : '#000000')};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   overflow: hidden;
   transition: background 0.25s ease, color 0.25s ease;
`;

const MainContentRow = styled.div`
   display: flex;
   flex: 1;
   min-height: 0;
   position: relative;
   overflow: hidden;
   padding-bottom: ${props => (props.hasBottomBar ? '80px' : '68px')};

   @media screen and (max-width: 768px) {
      padding-bottom: ${props => (props.hasBottomBar ? '136px' : '76px')};
   }
`;

class MusicJS extends Component {
   componentDidMount() {
      // Track device connection & session telemetry
      try {
         trackAppConnection();
      } catch (e) {
         // Silently ignore telemetry errors
      }

      window.addEventListener('beforeinstallprompt', e => {
         e.preventDefault();
         this.props.setDeferredPrompt(e);
      });
   }

   render() {
      const { audioState, authState, themeState } = this.props;
      const { hasAudio, isPlaying, playlist } = audioState;
      const { isAuthenticated } = authState;
      const themeMode = (themeState && themeState.theme) || 'dark';

      // Show the active player bar if audio has been queued/played or if user is logged in
      const showPlayerBar =
         (hasAudio && isPlaying) ||
         (playlist && playlist.length > 0) ||
         isAuthenticated;

      return (
         <Container themeMode={themeMode}>
            <WelcomeScreen />
            <TopNav />
            <MobileHeader />

            <MainContentRow hasBottomBar={showPlayerBar}>
               <Sidebar />
               <ViewContainer />
            </MainContentRow>

            {showPlayerBar ? <SpotifyPlayerBar /> : <PreviewBanner />}

            <MobileDock hasPlayerBar={showPlayerBar} />
            <SongNotesModal />
            <NotificationPanel />
            <InstallModal />
            <PreferencesModal />
            <FeedbackModal />
            <AdminDashboardModal />
            <AuthModal />
            <PopupContainer />
         </Container>
      );
   }
}

const mapStateToProps = state => ({
   audioState: state.audioState,
   authState: state.authState,
   themeState: state.themeState,
});

const mapDispatchToProps = dispatch => ({
   setDeferredPrompt: promptEvent => dispatch(setDeferredPrompt(promptEvent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicJS);
