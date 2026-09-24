import {
   LOGIN_SUCCESS,
   LOGOUT,
   OPEN_AUTH_MODAL,
   CLOSE_AUTH_MODAL,
   SET_AUTH_TAB,
} from './actions';

const STORAGE_KEY = 'harmoniq_auth_session';

const getInitialUser = () => {
   try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
         return JSON.parse(saved);
      }
   } catch (e) {
      console.warn('Could not read saved auth session:', e);
   }
   return null;
};

const initialUser = getInitialUser();

const initialState = {
   isAuthenticated: !!initialUser,
   user: initialUser,
   isModalOpen: false,
   modalTab: 'login', // 'login' | 'signup'
};

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            isModalOpen: false,
         };
      case LOGOUT:
         return {
            ...state,
            isAuthenticated: false,
            user: null,
            isModalOpen: false,
         };
      case OPEN_AUTH_MODAL:
         return {
            ...state,
            isModalOpen: true,
            modalTab: action.payload.tab || state.modalTab,
         };
      case CLOSE_AUTH_MODAL:
         return {
            ...state,
            isModalOpen: false,
         };
      case SET_AUTH_TAB:
         return {
            ...state,
            modalTab: action.payload.tab,
         };
      default:
         return state;
   }
}
