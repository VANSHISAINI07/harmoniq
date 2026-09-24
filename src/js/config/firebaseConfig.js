/**
 * ============================================================================
 * HARMONIQ CLOUD DATABASE CONFIGURATION (Google Firebase Firestore)
 * Lead Architect & Creator: VANSHI SAINI
 * ============================================================================
 * 
 * Harmoniq uses Google Firebase (100% Free Spark Plan) to store:
 * 1. User Connections & Sessions (Count of users, iOS vs Android vs Desktop)
 * 2. User Logins & Accounts
 * 3. Search Query Analytics (Top searched songs & artists)
 * 4. User Feedback, Feature Suggestions & Song Requests
 * 
 * HOW TO CONNECT YOUR FREE FIREBASE ACCOUNT:
 * ----------------------------------------------------------------------------
 * 1. Go to https://console.firebase.google.com/ and log in with your Google account.
 * 2. Click "Add project", name it "Harmoniq" (or any name you like).
 * 3. In the left menu, click "Firestore Database" -> click "Create database" -> select "Start in test mode" -> click Enable.
 * 4. Click the gear icon (Project Settings) -> scroll down to "Your apps" -> click the Web (</>) icon.
 * 5. Copy your Project ID below and paste it into this file:
 * ----------------------------------------------------------------------------
 */

export const FIREBASE_CONFIG = {
   // Paste your Firebase Project ID here (e.g. "harmoniq-audio-12345")
   projectId: 'harmoniq-96062',

   // Paste your Firebase Web API Key here
   apiKey: '',

   // Default database
   databaseName: '(default)',
};

/**
 * Returns true if the creator has linked their live Firebase project.
 */
export const isFirebaseConfigured = () => {
   return Boolean(
      FIREBASE_CONFIG.projectId &&
      FIREBASE_CONFIG.projectId.trim() !== '' &&
      !FIREBASE_CONFIG.projectId.includes('YOUR_')
   );
};
