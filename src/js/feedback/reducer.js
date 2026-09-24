/**
 * HARMONIQ FEEDBACK & ADMIN REDUCER
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 */

import {
   OPEN_FEEDBACK_MODAL,
   CLOSE_FEEDBACK_MODAL,
   OPEN_ADMIN_MODAL,
   CLOSE_ADMIN_MODAL,
} from './actions';

const initialState = {
   isFeedbackModalOpen: false,
   isAdminModalOpen: false,
};

export default function feedbackReducer(state = initialState, action) {
   switch (action.type) {
      case OPEN_FEEDBACK_MODAL:
         return {
            ...state,
            isFeedbackModalOpen: true,
         };
      case CLOSE_FEEDBACK_MODAL:
         return {
            ...state,
            isFeedbackModalOpen: false,
         };
      case OPEN_ADMIN_MODAL:
         return {
            ...state,
            isAdminModalOpen: true,
         };
      case CLOSE_ADMIN_MODAL:
         return {
            ...state,
            isAdminModalOpen: false,
         };
      default:
         return state;
   }
}
