import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeNotificationPanel, markAllRead } from '../../notifications/actions';

const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 998;
`;

const PanelContainer = styled.div`
   position: absolute;
   top: 60px;
   right: 80px;
   width: 360px;
   max-width: calc(100vw - 32px);
   background: #18181e;
   border-radius: 12px;
   border: 1px solid rgba(255, 255, 255, 0.1);
   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.85);
   z-index: 999;
   display: flex;
   flex-direction: column;
   overflow: hidden;
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

   @media screen and (max-width: 600px) {
      right: 16px;
      left: 16px;
      width: auto;
   }
`;

const PanelHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 16px 20px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const HeaderTitle = styled.h4`
   margin: 0;
   font-size: 16px;
   font-weight: 800;
   color: #ffffff;
   display: flex;
   align-items: center;
   gap: 8px;
`;

const MarkReadBtn = styled.button`
   background: transparent;
   border: none;
   color: #ccff00;
   font-size: 12px;
   font-weight: 700;
   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;

const NotifList = styled.div`
   display: flex;
   flex-direction: column;
   max-height: 380px;
   overflow-y: auto;

   &::-webkit-scrollbar {
      width: 6px;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
   }
`;

const NotifItem = styled.div`
   padding: 14px 20px;
   display: flex;
   flex-direction: column;
   gap: 4px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.05);
   background: ${props =>
      props.unread ? 'rgba(204, 255, 0, 0.03)' : 'transparent'};
   transition: background 0.15s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.06);
   }
`;

const ItemTop = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const ItemTitle = styled.span`
   font-size: 13px;
   font-weight: 700;
   color: #ffffff;
   display: flex;
   align-items: center;
   gap: 6px;
`;

const Badge = styled.span`
   font-size: 9px;
   font-weight: 800;
   color: #000;
   background: #ccff00;
   padding: 1px 6px;
   border-radius: 4px;
   letter-spacing: 0.5px;
`;

const TimeText = styled.span`
   font-size: 11px;
   color: #888892;
`;

const ItemMsg = styled.p`
   margin: 4px 0 0 0;
   font-size: 12px;
   color: #b3b3ba;
   line-height: 1.4;
`;

const PanelFooter = styled.div`
   padding: 10px 16px;
   background: rgba(0, 0, 0, 0.3);
   font-size: 11px;
   color: #72727a;
   text-align: center;
`;

class NotificationPanel extends Component {
   render() {
      const { notificationsState, closeNotificationPanel, markAllRead } =
         this.props;
      const { isPanelOpen, notifications } = notificationsState;

      if (!isPanelOpen) return null;

      const unreadCount = notifications.filter(n => !n.read).length;

      return (
         <React.Fragment>
            <Overlay onClick={closeNotificationPanel} />
            <PanelContainer>
               <PanelHeader>
                  <HeaderTitle>
                     Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </HeaderTitle>
                  {unreadCount > 0 && (
                     <MarkReadBtn onClick={markAllRead}>
                        Mark all as read
                     </MarkReadBtn>
                  )}
               </PanelHeader>

               <NotifList>
                  {notifications.map(n => (
                     <NotifItem key={n.id} unread={!n.read}>
                        <ItemTop>
                           <ItemTitle>
                              {n.title}
                              {n.badge && <Badge>{n.badge}</Badge>}
                           </ItemTitle>
                           <TimeText>{n.time}</TimeText>
                        </ItemTop>
                        <ItemMsg>{n.message}</ItemMsg>
                     </NotifItem>
                  ))}
               </NotifList>

               <PanelFooter>
                  Harmoniq v2.0 • Developed by VANSHI SAINI
               </PanelFooter>
            </PanelContainer>
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => ({
   notificationsState: state.notificationsState,
});

const mapDispatchToProps = dispatch => ({
   closeNotificationPanel: () => dispatch(closeNotificationPanel()),
   markAllRead: () => dispatch(markAllRead()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPanel);
