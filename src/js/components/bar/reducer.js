const initialState = {
   isFullscreen: false,
   showLyrics: false,
};

const navReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'TOGGLE_FULLSCREEN':
         return {
            ...state,
            isFullscreen: !state.isFullscreen,
         };
      case 'TOGGLE_LYRICS':
         return {
            ...state,
            showLyrics:
               action.show !== undefined ? action.show : !state.showLyrics,
         };
      default:
         return state;
   }
};

export default navReducer;
