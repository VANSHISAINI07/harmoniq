import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../../auth/actions';
import { openPreferencesModal } from '../../preferences/actions';
import { openInstallModal } from '../../install/actions';
import { openFeedbackModal, openAdminModal } from '../../feedback/actions';

const MenuOverlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 999;
`;

const MenuDropdown = styled.div`
   position: absolute;
   top: 60px;
   right: 24px;
   width: 280px;
   background: #282828;
   border-radius: 8px;
   box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
   padding: 16px;
   z-index: 1000;
   border: 1px solid rgba(255, 255, 255, 0.08);
   animation: fadeIn 0.15s ease-out;

   @keyframes fadeIn {
      from {
         opacity: 0;
         transform: translateY(-8px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }
`;

const UserHeader = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   padding-bottom: 12px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Avatar = styled.div`
   width: 44px;
   height: 44px;
   border-radius: 50%;
   background: linear-gradient(135deg, #1db954 0%, #191414 100%);
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 800;
   font-size: 16px;
   color: #fff;
   border: 2px solid #1db954;
`;

const UserDetails = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
`;

const UserName = styled.span`
   font-size: 15px;
   font-weight: 700;
   color: #fff;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const UserRole = styled.span`
   font-size: 11px;
   font-weight: 600;
   color: #1db954;
   letter-spacing: 0.5px;
   text-transform: uppercase;
   margin-top: 2px;
`;

const PlanBadge = styled.div`
   margin-top: 10px;
   padding: 6px 10px;
   background: rgba(29, 185, 84, 0.12);
   border: 1px solid rgba(29, 185, 84, 0.3);
   border-radius: 6px;
   font-size: 11px;
   font-weight: 600;
   color: #1ed760;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const MenuList = styled.div`
   margin-top: 10px;
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

const MenuItem = styled.a`
   display: flex;
   align-items: center;
   gap: 10px;
   padding: 10px;
   border-radius: 6px;
   font-size: 13px;
   font-weight: 500;
   color: #e0e0e0;
   text-decoration: none;
   cursor: pointer;
   transition: background 0.15s ease, color 0.15s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
   }
`;

const LogoutButton = styled.button`
   margin-top: 8px;
   width: 100%;
   padding: 10px;
   background: transparent;
   border: 1px solid rgba(255, 255, 255, 0.15);
   border-radius: 6px;
   font-size: 13px;
   font-weight: 600;
   color: #ff5252;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 82, 82, 0.12);
      border-color: #ff5252;
   }
`;

class ProfileMenu extends Component {
   getInitials(name) {
      if (!name) return 'VS';
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
         return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
   }

   render() {
      const { user, onClose, logoutUser } = this.props;
      if (!user) return null;

      const isDev =
         user.email &&
         user.email.toLowerCase() === 'vanshusaini2507@gmail.com';

      return (
         <React.Fragment>
            <MenuOverlay onClick={onClose} />
            <MenuDropdown>
               <UserHeader>
                  <Avatar>{this.getInitials(user.name)}</Avatar>
                  <UserDetails>
                     <UserName title={user.name}>{user.name}</UserName>
                     <UserRole>{user.role || 'Member'}</UserRole>
                  </UserDetails>
               </UserHeader>

               <PlanBadge>
                  <span>{user.plan || 'Harmoniq Premium'}</span>
                  <span>ACTIVE ✔</span>
               </PlanBadge>

               <MenuList>
                  {isDev && (
                     <MenuItem
                        as="button"
                        style={{
                           background: 'rgba(30, 215, 96, 0.16)',
                           border: '1.5px solid #1ed760',
                           color: '#1ed760',
                           fontWeight: 800,
                           width: '100%',
                           textAlign: 'left',
                           fontFamily: 'inherit',
                           boxShadow: '0 2px 10px rgba(30, 215, 96, 0.25)',
                        }}
                        onClick={() => {
                           this.props.openAdminModal();
                           onClose();
                        }}>
                        <span role="img" aria-label="shield">🛡️</span> Creator Intelligence Hub
                     </MenuItem>
                  )}
                  <MenuItem
                     as="button"
                     style={{
                        background: 'rgba(30, 215, 96, 0.1)',
                        border: '1px solid rgba(30, 215, 96, 0.3)',
                        color: '#1ed760',
                        fontWeight: 700,
                        width: '100%',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                     }}
                     onClick={() => {
                        this.props.openPreferencesModal();
                        onClose();
                     }}>
                     <span role="img" aria-label="gear">⚙️</span> Music Preferences & Taste
                  </MenuItem>
                  <MenuItem
                     as="button"
                     style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#e0e0e0',
                        fontWeight: 600,
                        width: '100%',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                     }}
                     onClick={() => {
                        this.props.openFeedbackModal();
                        onClose();
                     }}>
                     <span role="img" aria-label="chat">💬</span> Feedback & Song Requests
                  </MenuItem>
                  <MenuItem
                     as="button"
                     style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#e0e0e0',
                        fontWeight: 600,
                        width: '100%',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                     }}
                     onClick={() => {
                        this.props.openInstallModal();
                        onClose();
                     }}>
                     <span role="img" aria-label="download">⬇️</span> Install & Download App
                  </MenuItem>
                  <MenuItem
                     href="https://www.linkedin.com/in/vanshi-saini"
                     target="_blank"
                     rel="noopener noreferrer"
                     onClick={onClose}>
                     <span role="img" aria-label="briefcase">💼</span> Creator LinkedIn
                  </MenuItem>
                  <MenuItem
                     href="mailto:vanshi@harmoniq.app"
                     onClick={onClose}>
                     <span role="img" aria-label="envelope">✉️</span> Contact Architect
                  </MenuItem>
               </MenuList>

               <LogoutButton
                  onClick={() => {
                     logoutUser();
                     onClose();
                  }}>
                  Log out
               </LogoutButton>
            </MenuDropdown>
         </React.Fragment>
      );
   }
}

const mapDispatchToProps = dispatch => ({
   logoutUser: () => dispatch(logoutUser()),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
   openInstallModal: () => dispatch(openInstallModal()),
   openFeedbackModal: () => dispatch(openFeedbackModal()),
   openAdminModal: () => dispatch(openAdminModal()),
});

export default connect(null, mapDispatchToProps)(ProfileMenu);
