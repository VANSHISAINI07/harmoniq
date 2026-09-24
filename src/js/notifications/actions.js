export const MARK_ALL_READ = 'MARK_ALL_READ';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const TOGGLE_NOTIFICATION_PANEL = 'TOGGLE_NOTIFICATION_PANEL';
export const CLOSE_NOTIFICATION_PANEL = 'CLOSE_NOTIFICATION_PANEL';

export const markAllRead = () => ({
   type: MARK_ALL_READ,
});

export const addNotification = notification => ({
   type: ADD_NOTIFICATION,
   payload: { notification },
});

export const toggleNotificationPanel = () => ({
   type: TOGGLE_NOTIFICATION_PANEL,
});

export const closeNotificationPanel = () => ({
   type: CLOSE_NOTIFICATION_PANEL,
});
