import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { pushView, popView } from '../../views/actions';
import { playSong } from '../../audio/actions';
import { openAuthModal } from '../../auth/actions';
import { toggleTheme } from '../../theme/actions';
import { toggleNotificationPanel } from '../../notifications/actions';
import { openInstallModal } from '../../install/actions';
import {
   setSearchQuery,
   performSearch,
   toggleSearchDropdown,
   setSearchTab,
} from '../../search/actions';
import { openPreferencesModal } from '../../preferences/actions';
import { openFeedbackModal, openAdminModal } from '../../feedback/actions';
import ProfileMenu from '../auth/ProfileMenu';

const fadeIn = keyframes`
   from { opacity: 0; transform: translateY(-6px); }
   to { opacity: 1; transform: translateY(0); }
`;

const NavHeader = styled.header`
   height: 64px;
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#000000')};
   border-bottom: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.06)'};
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 20px;
   position: relative;
   z-index: 100;
   gap: 16px;
   transition: background 0.25s ease, border-color 0.25s ease;

   @media screen and (max-width: 768px) {
      padding: 0 12px;
      gap: 10px;
   }
`;

const LeftSection = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   flex-shrink: 0;
`;

const BrandLogo = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   cursor: pointer;
   user-select: none;
   padding-right: 8px;
`;

const LogoImage = styled.img`
   width: 38px;
   height: 38px;
   border-radius: 50%;
   object-fit: cover;
   box-shadow: 0 2px 10px rgba(30, 215, 96, 0.35);
   border: 1.5px solid #1ed760;
   background: #000;
`;

const BrandName = styled.span`
   font-size: 20px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   letter-spacing: -0.5px;

   @media screen and (max-width: 600px) {
      display: none;
   }
`;

const CircleButton = styled.button`
   width: 44px;
   height: 44px;
   border-radius: 50%;
   background: ${props => (props.themeMode === 'light' ? '#f0f2f5' : '#1f1f1f')};
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.themeMode === 'light' ? '#e4e6ea' : '#2a2a2a')};
      transform: scale(1.05);
   }

   &:active {
      transform: scale(0.95);
   }
`;

const NavigationArrows = styled.div`
   display: flex;
   align-items: center;
   gap: 6px;

   @media screen and (max-width: 900px) {
      display: none;
   }
`;

const ArrowButton = styled.button`
   width: 32px;
   height: 32px;
   border-radius: 50%;
   background: ${props =>
      props.themeMode === 'light'
         ? 'rgba(0, 0, 0, 0.05)'
         : 'rgba(0, 0, 0, 0.7)'};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'};
   color: ${props =>
      props.disabled
         ? props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.2)'
            : 'rgba(255, 255, 255, 0.3)'
         : props.themeMode === 'light'
            ? '#111827'
            : '#ffffff'};
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
   font-size: 14px;
   transition: all 0.15s ease;

   &:hover {
      ${props =>
         !props.disabled &&
         (props.themeMode === 'light'
            ? 'background: rgba(0, 0, 0, 0.1);'
            : 'background: rgba(255, 255, 255, 0.15);')}
   }
`;

const SearchCenter = styled.div`
   flex: 1;
   max-width: 480px;
   display: flex;
   align-items: center;
   position: relative;

   @media screen and (max-width: 550px) {
      max-width: none;
   }
`;

const SearchPill = styled.div`
   width: 100%;
   height: 44px;
   background: ${props => (props.themeMode === 'light' ? '#f0f2f5' : '#1f1f1f')};
   border-radius: 24px;
   display: flex;
   align-items: center;
   padding: 0 16px;
   gap: 12px;
   border: 1px solid
      ${props =>
         props.themeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'transparent'};
   transition: all 0.2s ease;

   &:focus-within {
      background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#282828')};
      border-color: #1ed760;
      box-shadow: 0 0 0 1px #1ed760;
   }

   &:hover {
      background: ${props => (props.themeMode === 'light' ? '#e9ecef' : '#282828')};
      border-color: rgba(30, 215, 96, 0.4);
   }
`;

const SearchInput = styled.input`
   flex: 1;
   background: transparent;
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   font-size: 14px;
   outline: none;

   &::placeholder {
      color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#b3b3b3')};
      font-size: 14px;
   }
`;

const SearchIcon = styled.span`
   color: #b3b3b3;
   font-size: 16px;
   display: flex;
   align-items: center;
`;

const BrowseIcon = styled.span`
   color: #b3b3b3;
   font-size: 16px;
   cursor: pointer;
   padding: 4px;
   border-left: 1px solid rgba(255, 255, 255, 0.1);
   padding-left: 10px;
   display: flex;
   align-items: center;

   &:hover {
      color: #fff;
   }
`;

const SearchDropdown = styled.div`
   position: absolute;
   top: calc(100% + 8px);
   left: 0;
   right: 0;
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#1e1e1e')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.15)'};
   border-radius: 12px;
   box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
   z-index: 1000;
   max-height: 480px;
   overflow-y: auto;
   animation: ${fadeIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
`;

const DropdownSection = styled.div`
   padding: 12px 14px;
   border-bottom: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.06)'
            : 'rgba(255, 255, 255, 0.08)'};
`;

const DropdownSectionTitle = styled.div`
   font-size: 11px;
   font-weight: 700;
   text-transform: uppercase;
   letter-spacing: 0.8px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#a7a7a7')};
   margin-bottom: 8px;
`;

const DropdownArtistCard = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   padding: 8px 10px;
   border-radius: 8px;
   cursor: pointer;
   transition: background 0.15s ease;

   &:hover {
      background: ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.1)'};
   }
`;

const DropdownArtistAvatar = styled.img`
   width: 44px;
   height: 44px;
   border-radius: 50%;
   object-fit: cover;
   background: #282828;
   border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DropdownArtistInfo = styled.div`
   flex: 1;
   min-width: 0;
`;

const DropdownArtistName = styled.div`
   font-size: 14px;
   font-weight: 700;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const DropdownArtistBadge = styled.span`
   display: inline-block;
   font-size: 11px;
   font-weight: 600;
   color: #1ed760;
   margin-top: 2px;
`;

const DropdownSongItem = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 8px 10px;
   border-radius: 8px;
   cursor: pointer;
   transition: background 0.15s ease;

   &:hover {
      background: ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.1)'};
   }
`;

const DropdownSongLeft = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   min-width: 0;
   flex: 1;
`;

const DropdownThumb = styled.img`
   width: 40px;
   height: 40px;
   border-radius: 6px;
   object-fit: cover;
   background: #282828;
`;

const DropdownSongMeta = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
`;

const DropdownSongTitle = styled.span`
   font-size: 13px;
   font-weight: 600;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const DropdownSongArtist = styled.span`
   font-size: 12px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#a7a7a7')};
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const DropdownPlayButton = styled.button`
   background: #1ed760;
   color: #000;
   border: none;
   width: 32px;
   height: 32px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   font-size: 13px;
   transition: transform 0.15s ease;
   flex-shrink: 0;

   &:hover {
      transform: scale(1.1);
      background: #22e66b;
   }
`;

const DropdownFooter = styled.button`
   width: 100%;
   padding: 12px 16px;
   background: transparent;
   border: none;
   color: #1ed760;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 6px;
   transition: background 0.15s ease;

   &:hover {
      background: rgba(30, 215, 96, 0.1);
      text-decoration: underline;
   }
`;

const RightSection = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;
   flex-shrink: 0;

   @media screen and (max-width: 768px) {
      gap: 10px;
   }
`;

const NavLink = styled.a`
   color: #b3b3b3;
   text-decoration: none;
   font-size: 14px;
   font-weight: 700;
   transition: color 0.15s ease;
   cursor: pointer;

   &:hover {
      color: #ffffff;
      transform: scale(1.03);
   }

   @media screen and (max-width: 1000px) {
      display: none;
   }
`;

const InstallButton = styled.button`
   display: inline-flex;
   align-items: center;
   gap: 7px;
   background: ${props =>
      props.themeMode === 'light'
         ? 'linear-gradient(135deg, rgba(22, 163, 74, 0.12) 0%, rgba(22, 163, 74, 0.05) 100%)'
         : 'linear-gradient(135deg, rgba(30, 215, 96, 0.18) 0%, rgba(30, 215, 96, 0.06) 100%)'};
   border: 1.5px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(22, 163, 74, 0.55)'
            : 'rgba(30, 215, 96, 0.6)'};
   color: ${props => (props.themeMode === 'light' ? '#15803d' : '#1ed760')};
   font-size: 13px;
   font-weight: 800;
   cursor: pointer;
   padding: 7px 15px;
   border-radius: 9999px;
   letter-spacing: 0.2px;
   box-shadow: 0 2px 10px
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(22, 163, 74, 0.15)'
            : 'rgba(30, 215, 96, 0.2)'};
   transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);

   &:hover {
      background: ${props =>
         props.themeMode === 'light' ? '#16a34a' : '#1ed760'};
      color: ${props => (props.themeMode === 'light' ? '#ffffff' : '#000000')};
      border-color: ${props =>
         props.themeMode === 'light' ? '#16a34a' : '#1ed760'};
      box-shadow: 0 4px 18px
         ${props =>
            props.themeMode === 'light'
               ? 'rgba(22, 163, 74, 0.35)'
               : 'rgba(30, 215, 96, 0.45)'};
      transform: translateY(-1px) scale(1.04);
   }

   &:active {
      transform: translateY(0) scale(0.97);
   }

   @media screen and (max-width: 850px) {
      display: none;
   }
`;

const DownloadIconWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 20px;
   height: 20px;
   border-radius: 50%;
   background: ${props =>
      props.themeMode === 'light'
         ? 'rgba(22, 163, 74, 0.2)'
         : 'rgba(30, 215, 96, 0.25)'};
   color: inherit;
   flex-shrink: 0;
   transition: all 0.2s ease;

   ${InstallButton}:hover & {
      background: ${props =>
         props.themeMode === 'light'
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(0, 0, 0, 0.2)'};
   }
`;

const SignUpButton = styled.button`
   background: transparent;
   border: none;
   color: #b3b3b3;
   font-size: 14px;
   font-weight: 700;
   cursor: pointer;
   padding: 8px 14px;
   transition: all 0.2s ease;

   &:hover {
      color: #ffffff;
      transform: scale(1.04);
   }
`;

const LogInButton = styled.button`
   background: #ffffff;
   color: #000000;
   border: none;
   border-radius: 9999px;
   font-size: 14px;
   font-weight: 800;
   padding: 12px 28px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: #f0f0f0;
      transform: scale(1.04);
   }

   &:active {
      transform: scale(0.98);
   }

   @media screen and (max-width: 480px) {
      padding: 10px 18px;
      font-size: 13px;
   }
`;

const IconButton = styled.button`
   width: 38px;
   height: 38px;
   border-radius: 50%;
   background: ${props =>
      props.themeMode === 'light' ? '#f0f2f5' : '#1f1f1f'};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   position: relative;
   transition: all 0.2s ease;

   &:hover {
      background: ${props =>
         props.themeMode === 'light' ? '#e4e6ea' : '#2a2a2a'};
      transform: scale(1.06);
   }

   &:active {
      transform: scale(0.94);
   }
`;

const UnreadDot = styled.span`
   position: absolute;
   top: 1px;
   right: 1px;
   background: #ff334b;
   color: #ffffff;
   font-size: 9px;
   font-weight: 800;
   height: 15px;
   min-width: 15px;
   padding: 0 3px;
   border-radius: 8px;
   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 2px 5px rgba(255, 51, 75, 0.4);
`;

const UserPill = styled.button`
   background: #000000;
   border: 1px solid rgba(255, 255, 255, 0.2);
   border-radius: 24px;
   padding: 3px 12px 3px 3px;
   display: flex;
   align-items: center;
   gap: 8px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.4);
   }
`;

const UserAvatar = styled.div`
   width: 32px;
   height: 32px;
   border-radius: 50%;
   background: linear-gradient(135deg, #1db954 0%, #191414 100%);
   color: #fff;
   font-size: 12px;
   font-weight: 800;
   display: flex;
   align-items: center;
   justify-content: center;
   border: 1px solid #1db954;
`;

const UserLabel = styled.span`
   color: #ffffff;
   font-size: 13px;
   font-weight: 700;
   max-width: 120px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   @media screen and (max-width: 500px) {
      display: none;
   }
`;

const ChevronDown = styled.span`
   color: #b3b3b3;
   font-size: 10px;
`;

class TopNav extends Component {
   state = {
      isProfileMenuOpen: false,
   };

   searchDebounce = null;
   searchPillRef = React.createRef();

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
      document.addEventListener('keydown', this.handleGlobalKeyDown);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
      document.removeEventListener('keydown', this.handleGlobalKeyDown);
      if (this.searchDebounce) clearTimeout(this.searchDebounce);
      if (this.logoClickTimer) clearTimeout(this.logoClickTimer);
   }

   handleGlobalKeyDown = e => {
      // Secret Creator Shortcut: Ctrl + Shift + V or Cmd + Shift + V
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'V' || e.key === 'v')) {
         e.preventDefault();
         this.props.openAdminModal();
      }
   };

   handleLogoClick = () => {
      this.logoClicks = (this.logoClicks || 0) + 1;
      clearTimeout(this.logoClickTimer);
      this.logoClickTimer = setTimeout(() => {
         this.logoClicks = 0;
      }, 700);

      // Secret Triple-Click: Opens Creator Intelligence Gate
      if (this.logoClicks >= 3) {
         this.logoClicks = 0;
         this.props.openAdminModal();
         return;
      }
      this.handleHomeClick();
   };

   handleClickOutside = e => {
      const el = this.searchPillRef && (this.searchPillRef.current || this.searchPillRef);
      if (el && typeof el.contains === 'function') {
         if (!el.contains(e.target)) {
            if (this.props.searchState && this.props.searchState.isDropdownOpen) {
               this.props.toggleSearchDropdown(false);
            }
         }
      }
   };

   handleHomeClick = () => {
      this.props.pushView({
         name: 'Library',
         title: 'Library',
         props: { hideTitle: true },
      });
   };

   handleSearchFocus = () => {
      const { searchState, viewState } = this.props;
      const q = (searchState && searchState.query) || '';

      const current = viewState.stack[viewState.stack.length - 1];
      if (!current || current.name !== 'Search') {
         this.props.pushView({
            name: 'Search',
            title: 'Artists and Songs',
            props: { hideTitle: true, initialQuery: q },
         });
      }

      if (q && q.trim()) {
         this.props.toggleSearchDropdown(true);
         if (!searchState.songResults || !searchState.songResults.length) {
            this.props.performSearch(q);
         }
      }
   };

   handleSearchChange = e => {
      const query = e.target.value;
      this.props.setSearchQuery(query);

      if (this.searchDebounce) clearTimeout(this.searchDebounce);

      if (query.trim()) {
         this.props.toggleSearchDropdown(true);
         this.searchDebounce = setTimeout(() => {
            this.props.performSearch(query.trim());
         }, 250);
      } else {
         this.props.toggleSearchDropdown(false);
         this.props.performSearch('');
      }
   };

   handleSearchKeyDown = e => {
      if (e.key === 'Enter') {
         this.props.toggleSearchDropdown(false);
         this.props.setSearchTab('all');
         const { searchState, viewState } = this.props;
         const q = (searchState && searchState.query) || '';
         const current = viewState.stack[viewState.stack.length - 1];
         if (!current || current.name !== 'Search') {
            this.props.pushView({
               name: 'Search',
               title: 'Artists and Songs',
               props: { hideTitle: true, initialQuery: q },
            });
         }
      } else if (e.key === 'Escape') {
         this.props.toggleSearchDropdown(false);
      }
   };

   handlePlaySongFromDropdown = (playlist, index) => {
      this.props.playSong({ playlist, index });
   };

   handleViewArtist = artist => {
      this.props.toggleSearchDropdown(false);
      const name = artist.name || artist.artist || 'Artist';
      this.props.pushView({
         name: 'Artist',
         title: name,
         props: {
            artist: name,
            artistImage: artist.image,
         },
      });
   };

   handleSeeAllResults = () => {
      this.props.toggleSearchDropdown(false);
      this.props.setSearchTab('all');
      const { searchState, viewState } = this.props;
      const q = (searchState && searchState.query) || '';
      const current = viewState.stack[viewState.stack.length - 1];
      if (!current || current.name !== 'Search') {
         this.props.pushView({
            name: 'Search',
            title: 'Artists and Songs',
            props: { hideTitle: true, initialQuery: q },
         });
      }
   };

   render() {
      const {
         viewState,
         popView,
         pushView,
         authState,
         openAuthModal,
         themeState,
         notificationsState,
         searchState,
         toggleTheme,
         toggleNotificationPanel,
         openPreferencesModal,
         openInstallModal,
         openFeedbackModal,
      } = this.props;
      const { isAuthenticated, user } = authState;
      const { isProfileMenuOpen } = this.state;
      const canGoBack = viewState.stack.length > 1;
      const themeMode = (themeState && themeState.theme) || 'dark';

      const queryValue = (searchState && searchState.query) || '';
      const isDropdownOpen = !!(searchState && searchState.isDropdownOpen);
      const songResults = (searchState && searchState.songResults) || [];
      const artistResults = (searchState && searchState.artistResults) || [];
      const isLoading = !!(searchState && searchState.isLoading);
      const topArtist = artistResults[0] || null;
      const displaySongs = songResults.slice(0, 4);

      const unreadCount = (
         (notificationsState && notificationsState.notifications) ||
         []
      ).filter(n => !n.read).length;

      return (
         <NavHeader themeMode={themeMode}>
            <LeftSection>
               <BrandLogo onClick={this.handleLogoClick} title="Harmoniq Home">
                  <LogoImage
                     src="images/harmoniq_logo.png"
                     alt="Harmoniq"
                     onError={e => {
                        e.target.style.display = 'none';
                     }}
                  />
                  <BrandName themeMode={themeMode}>Harmoniq</BrandName>
               </BrandLogo>

               <CircleButton
                  themeMode={themeMode}
                  onClick={this.handleHomeClick}
                  title="Home">
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                     <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33A2 2 0 0 1 22 7.577V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-5h-3v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 .99-1.731l7.5-4.33z" />
                  </svg>
               </CircleButton>

               <NavigationArrows>
                  <ArrowButton
                     themeMode={themeMode}
                     disabled={!canGoBack}
                     onClick={canGoBack ? popView : null}
                     title="Go Back">
                     ‹
                  </ArrowButton>
               </NavigationArrows>
            </LeftSection>

            <SearchCenter
               innerRef={el => { this.searchPillRef.current = el; }}
               ref={this.searchPillRef}>
               <SearchPill themeMode={themeMode}>
                  <SearchIcon>
                     <span role="img" aria-label="search">🔍</span>
                  </SearchIcon>
                  <SearchInput
                     themeMode={themeMode}
                     type="text"
                     placeholder="What do you want to play?"
                     value={queryValue}
                     onChange={this.handleSearchChange}
                     onFocus={this.handleSearchFocus}
                     onKeyDown={this.handleSearchKeyDown}
                  />
                  {queryValue ? (
                     <button
                        style={{
                           background: 'none',
                           border: 'none',
                           color: '#b3b3b3',
                           cursor: 'pointer',
                           fontSize: '14px',
                           padding: '4px',
                        }}
                        onClick={() => {
                           this.props.setSearchQuery('');
                           this.props.toggleSearchDropdown(false);
                           this.props.performSearch('');
                        }}>
                        ✕
                     </button>
                  ) : null}
                  <BrowseIcon
                     title="Browse All Artists & Songs"
                     onClick={() =>
                        pushView({
                           name: 'Search',
                           title: 'Artists and Songs',
                           props: { hideTitle: true, initialQuery: queryValue },
                        })
                     }>
                     <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                     </svg>
                  </BrowseIcon>
               </SearchPill>

               {isDropdownOpen && queryValue.trim() && (
                  <SearchDropdown themeMode={themeMode}>
                     {isLoading ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#b3b3b3', fontSize: '13px' }}>
                           Searching for "{queryValue}"...
                        </div>
                     ) : (
                        <React.Fragment>
                           {/* Top Artist Match */}
                           {topArtist && (
                              <DropdownSection themeMode={themeMode}>
                                 <DropdownSectionTitle themeMode={themeMode}>Top Artist</DropdownSectionTitle>
                                 <DropdownArtistCard
                                    themeMode={themeMode}
                                    onClick={() => this.handleViewArtist(topArtist)}>
                                    <DropdownArtistAvatar
                                       src={topArtist.image}
                                       onError={e => { e.target.src = 'images/default_artwork.svg'; }}
                                       alt={topArtist.name}
                                    />
                                    <DropdownArtistInfo>
                                       <DropdownArtistName themeMode={themeMode}>{topArtist.name}</DropdownArtistName>
                                       <DropdownArtistBadge>Artist • {topArtist.genre || 'Music'}</DropdownArtistBadge>
                                    </DropdownArtistInfo>
                                 </DropdownArtistCard>
                              </DropdownSection>
                           )}

                           {/* Top Songs */}
                           {displaySongs.length > 0 && (
                              <DropdownSection themeMode={themeMode}>
                                 <DropdownSectionTitle themeMode={themeMode}>Songs</DropdownSectionTitle>
                                 {displaySongs.map((song, idx) => (
                                    <DropdownSongItem
                                       key={song.id || idx}
                                       themeMode={themeMode}
                                       onClick={() => this.handlePlaySongFromDropdown(displaySongs, idx)}>
                                       <DropdownSongLeft>
                                          <DropdownThumb
                                             src={song.artwork}
                                             onError={e => { e.target.src = 'images/default_artwork.svg'; }}
                                             alt={song.name}
                                          />
                                          <DropdownSongMeta>
                                             <DropdownSongTitle themeMode={themeMode}>{song.name}</DropdownSongTitle>
                                             <DropdownSongArtist themeMode={themeMode}>{song.artist}</DropdownSongArtist>
                                          </DropdownSongMeta>
                                       </DropdownSongLeft>
                                       <DropdownPlayButton
                                          title={`Play ${song.name}`}
                                          onClick={e => {
                                             e.stopPropagation();
                                             this.handlePlaySongFromDropdown(displaySongs, idx);
                                          }}>
                                          ▶
                                       </DropdownPlayButton>
                                    </DropdownSongItem>
                                 ))}
                              </DropdownSection>
                           )}

                           {displaySongs.length === 0 && !topArtist && (
                              <div style={{ padding: '24px', textAlign: 'center', color: '#b3b3b3', fontSize: '13px' }}>
                                 No matching results for "{queryValue}".
                              </div>
                           )}

                           <DropdownFooter onClick={this.handleSeeAllResults}>
                              See all results for "{queryValue}" →
                           </DropdownFooter>
                        </React.Fragment>
                     )}
                  </SearchDropdown>
               )}
            </SearchCenter>

            <RightSection>
               <NavLink
                  onClick={() =>
                     alert(
                        'Harmoniq Premium features active: Full-length 320kbps streams, DES decryption, LRCLIB synchronized lyrics, all free by VANSHI SAINI!'
                     )
                  }>
                  Premium
               </NavLink>
               <NavLink
                  href="mailto:vanshi@harmoniq.app"
                  target="_blank"
                  rel="noopener noreferrer">
                  Support
               </NavLink>
               <NavLink
                  onClick={openFeedbackModal}
                  title="Feedback, Song Requests & Feature Suggestions">
                  Feedback
               </NavLink>
               <InstallButton
                  themeMode={themeMode}
                  onClick={openInstallModal}
                  title="Install & Download Harmoniq (PWA, Desktop & Mobile)">
                  <DownloadIconWrapper themeMode={themeMode}>
                     <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                     </svg>
                  </DownloadIconWrapper>
                  <span>Install App</span>
               </InstallButton>

               {/* Theme Toggle Button */}
               <IconButton
                  themeMode={themeMode}
                  onClick={toggleTheme}
                  title={
                     themeMode === 'dark'
                        ? 'Switch to Light Mode'
                        : 'Switch to Dark Mode'
                  }>
                  {themeMode === 'dark' ? (
                     <span role="img" aria-label="sun" style={{ fontSize: '17px' }}>
                        ☀️
                     </span>
                  ) : (
                     <span role="img" aria-label="moon" style={{ fontSize: '17px' }}>
                        🌙
                     </span>
                  )}
               </IconButton>

               {/* Notification Bell Button */}
               <IconButton
                  themeMode={themeMode}
                  onClick={toggleNotificationPanel}
                  title="Notifications">
                  <svg
                     width="18"
                     height="18"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2">
                     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                     <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && <UnreadDot>{unreadCount}</UnreadDot>}
               </IconButton>

                {/* Music Preferences & Taste Settings Button */}
                <IconButton
                   themeMode={themeMode}
                   onClick={openPreferencesModal}
                   title="Music Preferences & Taste (Write and customize your music)">
                   <span role="img" aria-label="gear" style={{ fontSize: '16px' }}>
                      ⚙️
                   </span>
                </IconButton>

               {isAuthenticated && user ? (
                  <React.Fragment>
                     <UserPill
                        onClick={() =>
                           this.setState({
                              isProfileMenuOpen: !isProfileMenuOpen,
                           })
                        }>
                        <UserAvatar>
                           {user.name ? user.name.slice(0, 2).toUpperCase() : 'VS'}
                        </UserAvatar>
                        <UserLabel title={user.name}>{user.name}</UserLabel>
                        <ChevronDown>▼</ChevronDown>
                     </UserPill>
                     {isProfileMenuOpen && (
                        <ProfileMenu
                           user={user}
                           onClose={() =>
                              this.setState({ isProfileMenuOpen: false })
                           }
                        />
                     )}
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <SignUpButton onClick={() => openAuthModal('signup')}>
                        Sign up
                     </SignUpButton>
                     <LogInButton onClick={() => openAuthModal('login')}>
                        Log in
                     </LogInButton>
                  </React.Fragment>
               )}
            </RightSection>
         </NavHeader>
      );
   }
}

const mapStateToProps = state => ({
   viewState: state.viewState,
   authState: state.authState,
   themeState: state.themeState,
   notificationsState: state.notificationsState,
   searchState: state.searchState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(pushView(view)),
   popView: () => dispatch(popView()),
   openAuthModal: tab => dispatch(openAuthModal(tab)),
   toggleTheme: () => dispatch(toggleTheme()),
   toggleNotificationPanel: () => dispatch(toggleNotificationPanel()),
   openInstallModal: () => dispatch(openInstallModal()),
   setSearchQuery: query => dispatch(setSearchQuery(query)),
   performSearch: query => dispatch(performSearch(query)),
   toggleSearchDropdown: isOpen => dispatch(toggleSearchDropdown(isOpen)),
   setSearchTab: tab => dispatch(setSearchTab(tab)),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
   openFeedbackModal: () => dispatch(openFeedbackModal()),
   openAdminModal: () => dispatch(openAdminModal()),
   playSong: ({ playlist, index }) => dispatch(playSong({ playlist, index })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
