import {
   OPEN_INSTALL_MODAL,
   CLOSE_INSTALL_MODAL,
   SET_DEFERRED_PROMPT,
} from './actions';

const initialState = {
   isInstallModalOpen: false,
   deferredPrompt: null,
};

export default function installReducer(state = initialState, action) {
   switch (action.type) {
      case OPEN_INSTALL_MODAL:
         return {
            ...state,
            isInstallModalOpen: true,
         };
      case CLOSE_INSTALL_MODAL:
         return {
            ...state,
            isInstallModalOpen: false,
         };
      case SET_DEFERRED_PROMPT:
         return {
            ...state,
            deferredPrompt: action.payload.promptEvent,
         };
      default:
         return state;
   }
}
