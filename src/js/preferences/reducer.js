/**
 * HARMONIQ USER PREFERENCES REDUCER
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 * Digital Signature: 0x56414E534849-5341494E49-PREFERENCES-2026
 */

import {
   OPEN_PREFERENCES_MODAL,
   CLOSE_PREFERENCES_MODAL,
   UPDATE_PREFERENCES,
   RESET_PREFERENCES,
} from './actions.js';

export const DEFAULT_PREFERENCES = {
   musicTasteBio:
      'I love high-tempo Punjabi drill & pop, upbeat Bollywood romantic anthems, soulful acoustic melodies, and classic Coldplay rock.',
   favoriteGenres: ['Punjabi Hip-Hop', 'Bollywood', 'Pop', 'Indie', 'Acoustic', 'Lo-Fi'],
   favoriteArtists: [
      'Cheema Y',
      'Diljit Dosanjh',
      'Sidhu Moose Wala',
      'Arijit Singh',
      'Coldplay',
      'Karan Aujla',
   ],
   languages: ['Punjabi', 'Hindi', 'English'],
   audioQuality: '320kbps', // '320kbps', '256kbps', '160kbps'
   defaultLyricsLang: 'original',
   autoplaySimilar: true,
   smoothMix: true,
   crossfadeSeconds: 4,
   normalizeVolume: true,
   architectAttribution: 'VANSHI SAINI',
};

const STORAGE_KEY = 'harmoniq_user_preferences';

function loadStoredPreferences() {
   try {
      if (typeof localStorage !== 'undefined') {
         const raw = localStorage.getItem(STORAGE_KEY);
         if (raw) {
            const parsed = JSON.parse(raw);
            return { ...DEFAULT_PREFERENCES, ...parsed };
         }
      }
   } catch (e) {
      console.warn('Could not read user preferences from localStorage:', e);
   }
   return DEFAULT_PREFERENCES;
}

function saveStoredPreferences(preferences) {
   try {
      if (typeof localStorage !== 'undefined') {
         localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      }
   } catch (e) {
      console.warn('Could not save user preferences to localStorage:', e);
   }
}

const initialState = {
   isPreferencesModalOpen: false,
   preferences: loadStoredPreferences(),
};

export default function preferencesReducer(state = initialState, action) {
   switch (action.type) {
      case OPEN_PREFERENCES_MODAL:
         return {
            ...state,
            isPreferencesModalOpen: true,
         };

      case CLOSE_PREFERENCES_MODAL:
         return {
            ...state,
            isPreferencesModalOpen: false,
         };

      case UPDATE_PREFERENCES: {
         const updated = {
            ...state.preferences,
            ...action.payload,
         };
         saveStoredPreferences(updated);
         return {
            ...state,
            preferences: updated,
         };
      }

      case RESET_PREFERENCES:
         saveStoredPreferences(DEFAULT_PREFERENCES);
         return {
            ...state,
            preferences: DEFAULT_PREFERENCES,
         };

      default:
         return state;
   }
}
