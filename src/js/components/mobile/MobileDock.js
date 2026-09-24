import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../../views/actions';
import { toggleTheme } from '../../theme/actions';
import { openNotesModal } from '../../notes/actions';
import { toggleNotificationPanel } from '../../notifications/actions';
import { openPreferencesModal } from '../../preferences/actions';

const DockWrapper = styled.nav`
   display: none;

   @media screen and (max-width: 768px) {
      display: flex;
      position: fixed;
      bottom: ${props => (props.hasPlayerBar ? '78px' : '14px')};
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 24px);
      max-width: 440px;
      height: 58px;
      background: ${props =>
         props.themeMode === 'light'
            ? 'rgba(255, 255, 255, 0.94)'
            : 'rgba(16, 16, 22, 0.92)'};
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 36px;
      border: 1px solid
         ${props =>
            props.themeMode === 'light'
               ? 'rgba(0, 0, 0, 0.08)'
               : 'rgba(255, 255, 255, 0.12)'};
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      align-items: center;
      justify-content: space-around;
      padding: 0 12px;
      z-index: 180;
      transition: all 0.25s ease;
   }
`;

const DockItem = styled.button`
   background: transparent;
   border: none;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: 3px;
   padding: 6px 10px;
   cursor: pointer;
   color: ${props =>
      props.active
         ? '#1ed760'
         : props.themeMode === 'light'
            ? '#555555'
            : '#a0a0a0'};
   font-size: 10px;
   font-weight: 700;
   position: relative;
   border-radius: 20px;
   transition: all 0.2s ease;

   &:hover {
      color: ${props => (props.themeMode === 'light' ? '#000000' : '#ffffff')};
      transform: translateY(-2px);
   }

   &:active {
      transform: scale(0.92);
   }
`;

const IconContainer = styled.div`
   width: 24px;
   height: 24px;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
`;

const Badge = styled.span`
   position: absolute;
   top: -3px;
   right: -6px;
   background: #ff334b;
   color: #ffffff;
   font-size: 9px;
   font-weight: 900;
   height: 14px;
   min-width: 14px;
   padding: 0 3px;
   border-radius: 7px;
   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 2px 4px rgba(255, 51, 75, 0.5);
`;

const ActiveDot = styled.span`
   position: absolute;
   top: -2px;
   right: -2px;
   width: 7px;
   height: 7px;
   background: #1ed760;
   border-radius: 50%;
   box-shadow: 0 0 6px #1ed760;
`;

class MobileDock extends Component {
   getCurrentSong = () => {
      const { audioState } = this.props;
      const { queue, inQueue, playlist, currentIndex } = audioState;
      if (queue.length && inQueue) return queue[0];
      if (playlist.length && currentIndex < playlist.length) {
         return playlist[currentIndex];
      }
      return null;
   };

   handleNotesClick = () => {
      const currentSong = this.getCurrentSong();
      this.props.openNotesModal(currentSong);
   };

   render() {
      const {
         themeState,
         toggleTheme,
         pushView,
         viewState,
         notificationsState,
         toggleNotificationPanel,
         hasPlayerBar,
         notesState,
      } = this.props;

      const themeMode = themeState.theme || 'dark';
      const currentView = viewState.stack[viewState.stack.length - 1] || {};
      const currentSong = this.getCurrentSong();

      const songKey = currentSong
         ? `${currentSong.name} - ${currentSong.artist}`
         : null;
      const hasSongNote =
         songKey &&
         notesState &&
         notesState.notes &&
         Boolean(notesState.notes[songKey]);

      const unreadCount = (notificationsState.notifications || []).filter(
         n => !n.read
      ).length;

      return (
         <DockWrapper themeMode={themeMode} hasPlayerBar={hasPlayerBar}>
            {/* 1. Home */}
            <DockItem
               themeMode={themeMode}
               active={currentView.name === 'Library'}
               onClick={() =>
                  pushView({
                     name: 'Library',
                     title: 'Library',
                     props: { hideTitle: true },
                  })
               }
               title="Home">
               <IconContainer>
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                     <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33A2 2 0 0 1 22 7.577V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-5h-3v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 .99-1.731l7.5-4.33z" />
                  </svg>
               </IconContainer>
               <span>Home</span>
            </DockItem>

            {/* 2. Search */}
            <DockItem
               themeMode={themeMode}
               active={currentView.name === 'Search'}
               onClick={() =>
                  pushView({
                     name: 'Search',
                     title: 'Artists & Songs',
                     props: { hideTitle: true },
                  })
               }
               title="Search">
               <IconContainer>
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2.5">
                     <circle cx="11" cy="11" r="7" />
                     <line x1="16.5" y1="16.5" x2="22" y2="22" />
                  </svg>
               </IconContainer>
               <span>Search</span>
            </DockItem>

            {/* 3. Artists */}
            <DockItem
               themeMode={themeMode}
               active={currentView.name === 'Artists'}
               onClick={() =>
                  pushView({
                     name: 'Artists',
                     title: 'Artists',
                     props: {},
                  })
               }
               title="Artists">
               <IconContainer>
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
               </IconContainer>
               <span>Artists</span>
            </DockItem>

            {/* 4. Notes */}
            <DockItem
               themeMode={themeMode}
               onClick={this.handleNotesClick}
               title="Song Notes">
               <IconContainer>
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2">
                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {hasSongNote && <ActiveDot />}
               </IconContainer>
               <span>Notes</span>
            </DockItem>

            {/* 5. Theme Toggle */}
            <DockItem
               themeMode={themeMode}
               onClick={toggleTheme}
               title={
                  themeMode === 'dark'
                     ? 'Switch to Light Mode'
                     : 'Switch to Dark Mode'
               }>
               <IconContainer>
                  {themeMode === 'dark' ? (
                     <span role="img" aria-label="sun" style={{ fontSize: '18px' }}>
                        ☀️
                     </span>
                  ) : (
                     <span role="img" aria-label="moon" style={{ fontSize: '18px' }}>
                        🌙
                     </span>
                  )}
               </IconContainer>
               <span>{themeMode === 'dark' ? 'Light' : 'Dark'}</span>
            </DockItem>

            {/* 6. Preferences */}
            <DockItem
               themeMode={themeMode}
               onClick={this.props.openPreferencesModal}
               title="Music Preferences & Taste">
               <IconContainer>
                  <span role="img" aria-label="gear" style={{ fontSize: '18px' }}>
                     ⚙️
                  </span>
               </IconContainer>
               <span>Pref</span>
            </DockItem>

            {/* 7. Notifications */}
            <DockItem
               themeMode={themeMode}
               onClick={toggleNotificationPanel}
               title="Notifications">
               <IconContainer>
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2">
                     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                     <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
               </IconContainer>
               <span>Alerts</span>
            </DockItem>
         </DockWrapper>
      );
   }
}

const mapStateToProps = state => ({
   themeState: state.themeState,
   audioState: state.audioState,
   notesState: state.notesState,
   notificationsState: state.notificationsState,
   viewState: state.viewState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(pushView(view)),
   toggleTheme: () => dispatch(toggleTheme()),
   openNotesModal: song => dispatch(openNotesModal(song)),
   toggleNotificationPanel: () => dispatch(toggleNotificationPanel()),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileDock);
