/**
 * HARMONIQ FEEDBACK & ADMIN ACTIONS
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 */

export const OPEN_FEEDBACK_MODAL = 'OPEN_FEEDBACK_MODAL';
export const CLOSE_FEEDBACK_MODAL = 'CLOSE_FEEDBACK_MODAL';
export const OPEN_ADMIN_MODAL = 'OPEN_ADMIN_MODAL';
export const CLOSE_ADMIN_MODAL = 'CLOSE_ADMIN_MODAL';

export const openFeedbackModal = () => ({
   type: OPEN_FEEDBACK_MODAL,
});

export const closeFeedbackModal = () => ({
   type: CLOSE_FEEDBACK_MODAL,
});

export const openAdminModal = () => ({
   type: OPEN_ADMIN_MODAL,
});

export const closeAdminModal = () => ({
   type: CLOSE_ADMIN_MODAL,
});
