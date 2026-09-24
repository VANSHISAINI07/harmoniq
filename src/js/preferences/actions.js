/**
 * HARMONIQ USER PREFERENCES & MUSIC TASTE ACTIONS
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 * Digital Signature: 0x56414E534849-5341494E49-PREFERENCES-2026
 */

export const OPEN_PREFERENCES_MODAL = 'OPEN_PREFERENCES_MODAL';
export const CLOSE_PREFERENCES_MODAL = 'CLOSE_PREFERENCES_MODAL';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';
export const RESET_PREFERENCES = 'RESET_PREFERENCES';

export const openPreferencesModal = () => ({
   type: OPEN_PREFERENCES_MODAL,
});

export const closePreferencesModal = () => ({
   type: CLOSE_PREFERENCES_MODAL,
});

export const updatePreferences = preferences => ({
   type: UPDATE_PREFERENCES,
   payload: preferences,
});

export const resetPreferences = () => ({
   type: RESET_PREFERENCES,
});
