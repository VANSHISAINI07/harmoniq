import { trackUserLogin } from '../services/cloudDatabase';

// Authentication action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const OPEN_AUTH_MODAL = 'OPEN_AUTH_MODAL';
export const CLOSE_AUTH_MODAL = 'CLOSE_AUTH_MODAL';
export const SET_AUTH_TAB = 'SET_AUTH_TAB';

const STORAGE_KEY = 'harmoniq_auth_session';

export const openAuthModal = (tab = 'login') => ({
   type: OPEN_AUTH_MODAL,
   payload: { tab },
});

export const closeAuthModal = () => ({
   type: CLOSE_AUTH_MODAL,
});

export const setAuthTab = tab => ({
   type: SET_AUTH_TAB,
   payload: { tab },
});

export const loginSuccess = user => {
   try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
   } catch (e) {
      console.warn('LocalStorage error:', e);
   }

   // Sync user login to cloud telemetry
   try {
      trackUserLogin(user);
   } catch (e) {
      // ignore
   }

   return {
      type: LOGIN_SUCCESS,
      payload: { user },
   };
};

export const logoutUser = () => {
   try {
      localStorage.removeItem(STORAGE_KEY);
   } catch (e) {
      console.warn('LocalStorage error:', e);
   }
   return {
      type: LOGOUT,
   };
};

// Log in as the lead creator and architect VANSHI SAINI
export const loginAsDeveloper = () => dispatch => {
   const devUser = {
      name: 'VANSHI SAINI',
      email: 'vanshi@harmoniq.app',
      role: 'Lead Architect & Creator',
      plan: 'Harmoniq Premium Lifetime',
      avatar: 'images/default_artwork.svg',
      linkedin: 'https://www.linkedin.com/in/vanshi-saini',
      joinedDate: '2026',
      verified: true,
   };
   dispatch(loginSuccess(devUser));
   dispatch(closeAuthModal());
};

// Standard login with email/username and password
export const loginUser = ({ identifier, password }) => dispatch => {
   if (!identifier || !password) {
      return { success: false, error: 'Please enter both your email/username and password.' };
   }

   // If the user logs in using developer credentials or any custom account
   const isDev =
      identifier.toLowerCase().includes('vanshi') ||
      identifier.toLowerCase().includes('vanshisaini');

   const user = {
      name: isDev ? 'VANSHI SAINI' : identifier.split('@')[0] || 'Harmoniq Listener',
      email: identifier.includes('@') ? identifier : `${identifier}@harmoniq.com`,
      role: isDev ? 'Lead Architect & Creator' : 'Harmoniq Pro Listener',
      plan: 'Harmoniq Premium',
      avatar: 'images/default_artwork.svg',
      linkedin: isDev ? 'https://www.linkedin.com/in/vanshi-saini' : null,
      joinedDate: new Date().getFullYear().toString(),
      verified: isDev,
   };

   dispatch(loginSuccess(user));
   dispatch(closeAuthModal());
   return { success: true, user };
};

// Sign up new user
export const signupUser = ({ name, email, password }) => dispatch => {
   if (!name || !email || !password) {
      return { success: false, error: 'Please fill out all required fields.' };
   }

   if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
   }

   const user = {
      name: name.trim(),
      email: email.trim(),
      role: 'Harmoniq Member',
      plan: 'Harmoniq Premium Free Trial',
      avatar: 'images/default_artwork.svg',
      joinedDate: new Date().getFullYear().toString(),
      verified: false,
   };

   dispatch(loginSuccess(user));
   dispatch(closeAuthModal());
   return { success: true, user };
};
