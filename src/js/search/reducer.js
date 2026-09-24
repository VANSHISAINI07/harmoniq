import {
   SET_SEARCH_QUERY,
   SEARCH_START,
   SEARCH_SUCCESS,
   SEARCH_FAILURE,
   SET_SEARCH_TAB,
   TOGGLE_SEARCH_DROPDOWN,
} from './actions';

const initialState = {
   query: '',
   songResults: [],
   artistResults: [],
   isLoading: false,
   activeTab: 'all', // 'all' | 'artists' | 'songs' | 'local'
   isDropdownOpen: false,
   lastSearchedQuery: '',
};

const searchReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_SEARCH_QUERY:
         return {
            ...state,
            query: action.query,
         };
      case SEARCH_START:
         return {
            ...state,
            isLoading: true,
         };
      case SEARCH_SUCCESS:
         return {
            ...state,
            isLoading: false,
            songResults: action.songs,
            artistResults: action.artists,
            lastSearchedQuery: action.query,
         };
      case SEARCH_FAILURE:
         return {
            ...state,
            isLoading: false,
            songResults: [],
            artistResults: [],
            lastSearchedQuery: action.query,
         };
      case SET_SEARCH_TAB:
         return {
            ...state,
            activeTab: action.tab,
         };
      case TOGGLE_SEARCH_DROPDOWN:
         return {
            ...state,
            isDropdownOpen: action.isOpen,
         };
      default:
         return state;
   }
};

export default searchReducer;
