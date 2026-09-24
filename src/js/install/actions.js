export const OPEN_INSTALL_MODAL = 'OPEN_INSTALL_MODAL';
export const CLOSE_INSTALL_MODAL = 'CLOSE_INSTALL_MODAL';
export const SET_DEFERRED_PROMPT = 'SET_DEFERRED_PROMPT';

export const openInstallModal = () => ({
   type: OPEN_INSTALL_MODAL,
});

export const closeInstallModal = () => ({
   type: CLOSE_INSTALL_MODAL,
});

export const setDeferredPrompt = promptEvent => ({
   type: SET_DEFERRED_PROMPT,
   payload: { promptEvent },
});

export const triggerPwaInstall = () => async (dispatch, getState) => {
   const { deferredPrompt } = getState().installState;
   if (deferredPrompt) {
      try {
         deferredPrompt.prompt();
         const choice = await deferredPrompt.userChoice;
         if (choice.outcome === 'accepted') {
            console.log('User accepted the Harmoniq PWA install prompt');
         } else {
            console.log('User dismissed the Harmoniq PWA install prompt');
         }
      } catch (e) {
         console.warn('Error during PWA install prompt:', e);
      }
      dispatch({ type: SET_DEFERRED_PROMPT, payload: { promptEvent: null } });
      dispatch(closeInstallModal());
   }
};
