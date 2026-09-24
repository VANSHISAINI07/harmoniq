export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_THEME = 'SET_THEME';

const THEME_STORAGE_KEY = 'harmoniq_theme';

export const toggleTheme = () => (dispatch, getState) => {
   const current = getState().themeState.theme;
   const newTheme = current === 'dark' ? 'light' : 'dark';
   try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
   } catch (e) {
      console.warn('LocalStorage error:', e);
   }
   dispatch({
      type: TOGGLE_THEME,
      payload: { theme: newTheme },
   });
};

export const setTheme = theme => {
   try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
   } catch (e) {
      console.warn('LocalStorage error:', e);
   }
   return {
      type: SET_THEME,
      payload: { theme },
   };
};
