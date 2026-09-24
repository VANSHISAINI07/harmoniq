import {
   SAVE_SONG_NOTE,
   DELETE_SONG_NOTE,
   OPEN_NOTES_MODAL,
   CLOSE_NOTES_MODAL,
} from './actions';

const NOTES_STORAGE_KEY = 'harmoniq_song_notes';

const getInitialNotes = () => {
   try {
      const saved = localStorage.getItem(NOTES_STORAGE_KEY);
      if (saved) {
         return JSON.parse(saved);
      }
   } catch (e) {
      console.warn('LocalStorage error reading notes:', e);
   }
   return {};
};

const initialState = {
   notes: getInitialNotes(),
   isNotesModalOpen: false,
   activeSongForNote: null,
};

export default function notesReducer(state = initialState, action) {
   switch (action.type) {
      case SAVE_SONG_NOTE:
      case DELETE_SONG_NOTE:
         return {
            ...state,
            notes: action.payload.notes,
         };
      case OPEN_NOTES_MODAL:
         return {
            ...state,
            isNotesModalOpen: true,
            activeSongForNote: action.payload.song,
         };
      case CLOSE_NOTES_MODAL:
         return {
            ...state,
            isNotesModalOpen: false,
            activeSongForNote: null,
         };
      default:
         return state;
   }
}
