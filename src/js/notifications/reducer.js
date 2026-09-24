import {
   MARK_ALL_READ,
   ADD_NOTIFICATION,
   TOGGLE_NOTIFICATION_PANEL,
   CLOSE_NOTIFICATION_PANEL,
} from './actions';

const initialNotifications = [
   {
      id: 'notif-1',
      title: 'Harmoniq Audio Engine Online',
      message: 'Engineered by VANSHI SAINI: 320kbps streams, DES decryption, and LRCLIB real-time karaoke sync are all active.',
      time: 'Just now',
      read: false,
      badge: 'ARCHITECT',
   },
   {
      id: 'notif-2',
      title: 'New Feature: Song Notes 📝',
      message: 'Write and store personal notes, lyrics thoughts, and memories on any song with the new Notes feature.',
      time: '10m ago',
      read: false,
      badge: 'NEW',
   },
   {
      id: 'notif-3',
      title: 'Dark & Light Mode Switcher 🌙☀️',
      message: 'Seamlessly toggle between Dark Mode and Light Mode across all mobile, tablet, and desktop views.',
      time: '1h ago',
      read: false,
      badge: 'THEME',
   },
];

const initialState = {
   notifications: initialNotifications,
   isPanelOpen: false,
};

export default function notificationsReducer(state = initialState, action) {
   switch (action.type) {
      case MARK_ALL_READ:
         return {
            ...state,
            notifications: state.notifications.map(n => ({ ...n, read: true })),
         };
      case ADD_NOTIFICATION:
         return {
            ...state,
            notifications: [action.payload.notification, ...state.notifications],
         };
      case TOGGLE_NOTIFICATION_PANEL:
         return {
            ...state,
            isPanelOpen: !state.isPanelOpen,
         };
      case CLOSE_NOTIFICATION_PANEL:
         return {
            ...state,
            isPanelOpen: false,
         };
      default:
         return state;
   }
}
