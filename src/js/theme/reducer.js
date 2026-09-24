import { TOGGLE_THEME, SET_THEME } from './actions';

const THEME_STORAGE_KEY = 'harmoniq_theme';

const getInitialTheme = () => {
   try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
         return saved;
      }
   } catch (e) {
      console.warn('LocalStorage error:', e);
   }
   return 'dark'; // Default to modern dark mode
};

const initialState = {
   theme: getInitialTheme(),
};

export default function themeReducer(state = initialState, action) {
   switch (action.type) {
      case TOGGLE_THEME:
      case SET_THEME:
         return {
            ...state,
            theme: action.payload.theme,
         };
      default:
         return state;
   }
}
