import { searchFullSongs, searchArtists } from '../services/musicService';
import { trackSearchQuery } from '../services/cloudDatabase';

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SEARCH_START = 'SEARCH_START';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SET_SEARCH_TAB = 'SET_SEARCH_TAB';
export const TOGGLE_SEARCH_DROPDOWN = 'TOGGLE_SEARCH_DROPDOWN';

export const setSearchQuery = query => ({
   type: SET_SEARCH_QUERY,
   query,
});

export const setSearchTab = tab => ({
   type: SET_SEARCH_TAB,
   tab,
});

export const toggleSearchDropdown = isOpen => ({
   type: TOGGLE_SEARCH_DROPDOWN,
   isOpen,
});

export const performSearch = query => {
   return async (dispatch, getState) => {
      const currentQuery = getState().searchState && getState().searchState.query !== undefined
         ? getState().searchState.query
         : '';
      const q = (query !== undefined ? query : currentQuery).trim();
      
      dispatch({ type: SEARCH_START, query: q });

      try {
         // When query is empty (e.g. user cleared search), fetch default recommended 'Top Hits'
         // without forcing 'Top Hits' into the search input.
         const searchTerm = q || 'Top Hits';
         const [songs, artists] = await Promise.all([
            searchFullSongs(searchTerm),
            searchArtists(searchTerm),
         ]);

         dispatch({
            type: SEARCH_SUCCESS,
            query: q,
            songs: songs || [],
            artists: artists || [],
         });

         // Anonymously track search query for creator intelligence & discovery improvement
         if (q && q.toLowerCase() !== 'top hits') {
            try {
               const totalResults = (songs ? songs.length : 0) + (artists ? artists.length : 0);
               trackSearchQuery(q, totalResults);
            } catch (e) {
               // Silently ignore telemetry failure
            }
         }
      } catch (err) {
         console.warn('Search action error:', err);
         dispatch({
            type: SEARCH_FAILURE,
            query: q,
            error: err.message,
         });
      }
   };
};
