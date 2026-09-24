export const SAVE_SONG_NOTE = 'SAVE_SONG_NOTE';
export const DELETE_SONG_NOTE = 'DELETE_SONG_NOTE';
export const OPEN_NOTES_MODAL = 'OPEN_NOTES_MODAL';
export const CLOSE_NOTES_MODAL = 'CLOSE_NOTES_MODAL';

const NOTES_STORAGE_KEY = 'harmoniq_song_notes';

export const openNotesModal = (song = null) => ({
   type: OPEN_NOTES_MODAL,
   payload: { song },
});

export const closeNotesModal = () => ({
   type: CLOSE_NOTES_MODAL,
});

export const saveSongNote = ({ songKey, noteText, songInfo }) => (dispatch, getState) => {
   const currentNotes = getState().notesState.notes || {};
   const updated = {
      ...currentNotes,
      [songKey]: {
         text: noteText,
         updatedAt: new Date().toLocaleString(),
         songInfo,
      },
   };

   try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updated));
   } catch (e) {
      console.warn('LocalStorage error saving note:', e);
   }

   dispatch({
      type: SAVE_SONG_NOTE,
      payload: { notes: updated },
   });
};

export const deleteSongNote = songKey => (dispatch, getState) => {
   const currentNotes = { ...(getState().notesState.notes || {}) };
   delete currentNotes[songKey];

   try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(currentNotes));
   } catch (e) {
      console.warn('LocalStorage error deleting note:', e);
   }

   dispatch({
      type: DELETE_SONG_NOTE,
      payload: { notes: currentNotes },
   });
};
