import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../../views/actions';
import { toggleTheme } from '../../theme/actions';
import { toggleNotificationPanel } from '../../notifications/actions';
import { openNotesModal } from '../../notes/actions';
import { openPreferencesModal } from '../../preferences/actions';
import { openInstallModal } from '../../install/actions';

const HeaderContainer = styled.div`
   display: none;

   @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px 16px 10px 16px;
      background: ${props =>
         props.themeMode === 'light' ? '#ffffff' : '#0b0b0f'};
      border-bottom: 1px solid
         ${props =>
            props.themeMode === 'light'
               ? 'rgba(0, 0, 0, 0.08)'
               : 'rgba(255, 255, 255, 0.08)'};
      z-index: 90;
   }
`;

const TopRow = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const UserGreeting = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

const AvatarCircle = styled.div`
   width: 38px;
   height: 38px;
   border-radius: 50%;
   background: linear-gradient(135deg, #1ed760 0%, #00b040 100%);
   color: #000000;
   font-weight: 900;
   font-size: 14px;
   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 12px rgba(30, 215, 96, 0.35);
   border: 2px solid #ffffff;
`;

const GreetingTexts = styled.div`
   display: flex;
   flex-direction: column;
`;

const HelloTitle = styled.h2`
   margin: 0;
   font-size: 17px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   letter-spacing: -0.3px;
`;

const ArchitectSubtitle = styled.span`
   font-size: 11px;
   font-weight: 600;
   color: #1ed760;
   letter-spacing: 0.2px;
`;

const ActionsCluster = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
`;

const RoundIconBtn = styled.button`
   width: 34px;
   height: 34px;
   border-radius: 50%;
   background: ${props =>
      props.themeMode === 'light'
         ? 'rgba(0, 0, 0, 0.05)'
         : 'rgba(255, 255, 255, 0.1)'};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.12)'};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   position: relative;
   transition: all 0.2s ease;

   &:hover {
      background: #1ed760;
      color: #000000;
   }

   &:active {
      transform: scale(0.92);
   }
`;

const Badge = styled.span`
   position: absolute;
   top: -2px;
   right: -2px;
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
`;

const ChipsRow = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   overflow-x: auto;
   padding-bottom: 2px;
   -webkit-overflow-scrolling: touch;

   &::-webkit-scrollbar {
      display: none;
   }
`;

const Chip = styled.button`
   background: ${props =>
      props.active
         ? '#1ed760'
         : props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.06)'
            : 'rgba(255, 255, 255, 0.08)'};
   color: ${props =>
      props.active
         ? '#000000'
         : props.themeMode === 'light'
            ? '#333333'
            : '#e0e0e0'};
   border: 1px solid
      ${props =>
         props.active
            ? '#1ed760'
            : props.themeMode === 'light'
               ? 'rgba(0, 0, 0, 0.1)'
               : 'rgba(255, 255, 255, 0.12)'};
   border-radius: 18px;
   padding: 6px 14px;
   font-size: 12px;
   font-weight: 700;
   white-space: nowrap;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.active ? '#1ed760' : 'rgba(30, 215, 96, 0.2)')};
      color: ${props => (props.active ? '#000000' : '#1ed760')};
   }
`;

class MobileHeader extends Component {
   state = {
      activeChip: 'All',
   };

   handleChipClick = chip => {
      this.setState({ activeChip: chip });
      const { pushView, openNotesModal, audioState } = this.props;

      if (chip === 'All' || chip === 'Music') {
         pushView({
            name: 'Library',
            title: 'Library',
            props: { hideTitle: true },
         });
      } else if (chip === 'Artists') {
         pushView({
            name: 'Artists',
            title: 'Artists',
            props: {},
         });
      } else if (chip === 'Bollywood') {
         pushView({
            name: 'Search',
            title: 'Artists & Songs',
            props: { initialQuery: 'Arijit Singh' },
         });
      } else if (chip === 'Notes') {
         const { queue, inQueue, playlist, currentIndex } = audioState;
         const current =
            queue.length && inQueue
               ? queue[0]
               : playlist.length && currentIndex < playlist.length
                  ? playlist[currentIndex]
                  : null;
         openNotesModal(current);
      } else if (chip === 'Preferences') {
         this.props.openPreferencesModal();
      } else if (chip === 'Install App' || chip === 'Install') {
         this.props.openInstallModal();
      }
   };

   render() {
      const {
         themeState,
         authState,
         toggleTheme,
         notificationsState,
         toggleNotificationPanel,
      } = this.props;

      const themeMode = themeState.theme || 'dark';
      const userName =
         authState.isAuthenticated && authState.user && authState.user.name
            ? authState.user.name
            : 'VANSHI SAINI';

      const unreadCount = (notificationsState.notifications || []).filter(
         n => !n.read
      ).length;

      const initials = userName
         .split(' ')
         .map(n => n[0])
         .join('')
         .slice(0, 2)
         .toUpperCase();

      const chips = ['All', 'Music', 'Artists', 'Preferences ⚙️', 'Install App ⬇️', 'Bollywood', 'Notes'];

      return (
         <HeaderContainer themeMode={themeMode}>
            <TopRow>
               <UserGreeting>
                  <AvatarCircle>{initials}</AvatarCircle>
                  <GreetingTexts>
                     <HelloTitle themeMode={themeMode}>Hi, {userName}</HelloTitle>
                     <ArchitectSubtitle>Lead Architect • Harmoniq</ArchitectSubtitle>
                  </GreetingTexts>
               </UserGreeting>

               <ActionsCluster>
                  <RoundIconBtn
                     themeMode={themeMode}
                     onClick={this.props.openPreferencesModal}
                     title="Music Preferences & Taste (Write & configure)">
                     <span role="img" aria-label="gear" style={{ fontSize: '15px' }}>
                        ⚙️
                     </span>
                  </RoundIconBtn>

                  <RoundIconBtn
                     themeMode={themeMode}
                     onClick={toggleTheme}
                     title="Toggle Dark / Light Mode">
                     {themeMode === 'dark' ? (
                        <span role="img" aria-label="sun" style={{ fontSize: '15px' }}>
                           ☀️
                        </span>
                     ) : (
                        <span role="img" aria-label="moon" style={{ fontSize: '15px' }}>
                           🌙
                        </span>
                     )}
                  </RoundIconBtn>

                  <RoundIconBtn
                     themeMode={themeMode}
                     onClick={toggleNotificationPanel}
                     title="Notifications">
                     <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                     </svg>
                     {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
                  </RoundIconBtn>
               </ActionsCluster>
            </TopRow>

            <ChipsRow>
               {chips.map(chip => (
                  <Chip
                     key={chip}
                     active={this.state.activeChip === chip}
                     themeMode={themeMode}
                     onClick={() => this.handleChipClick(chip.replace(' ⚙️', ''))}>
                     {chip}
                  </Chip>
               ))}
            </ChipsRow>
         </HeaderContainer>
      );
   }
}

const mapStateToProps = state => ({
   themeState: state.themeState,
   authState: state.authState,
   notificationsState: state.notificationsState,
   audioState: state.audioState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(pushView(view)),
   toggleTheme: () => dispatch(toggleTheme()),
   toggleNotificationPanel: () => dispatch(toggleNotificationPanel()),
   openNotesModal: song => dispatch(openNotesModal(song)),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
   openInstallModal: () => dispatch(openInstallModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);
