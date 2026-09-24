/**
 * ============================================================================
 * HARMONIQ CLOUD DATABASE & TELEMETRY SERVICE
 * Google Firebase Firestore Integration + Offline Telemetry Store
 * Lead Architect & Creator: VANSHI SAINI
 * ============================================================================
 */

import { FIREBASE_CONFIG, isFirebaseConfigured } from '../config/firebaseConfig.js';

const TELEMETRY_SESSIONS_KEY = 'harmoniq_cloud_sessions';
const TELEMETRY_USERS_KEY = 'harmoniq_cloud_users';
const TELEMETRY_SEARCH_KEY = 'harmoniq_cloud_searches';
const TELEMETRY_FEEDBACK_KEY = 'harmoniq_cloud_feedback';

// Helper to detect device and OS platform
export const detectPlatform = () => {
   if (typeof window === 'undefined' || !window.navigator) {
      return { platform: 'Unknown', isMobile: false, isPwa: false };
   }

   const ua = window.navigator.userAgent || '';
   let os = 'Desktop';
   let isMobile = false;

   if (/iPhone/i.test(ua)) {
      os = 'iOS (iPhone)';
      isMobile = true;
   } else if (/iPad/i.test(ua)) {
      os = 'iOS (iPad)';
      isMobile = true;
   } else if (/Android/i.test(ua)) {
      os = 'Android';
      isMobile = true;
   } else if (/Windows/i.test(ua)) {
      os = 'Windows PC';
   } else if (/Macintosh|Mac OS X/i.test(ua)) {
      os = 'macOS';
   } else if (/Linux/i.test(ua)) {
      os = 'Linux';
   }

   const isPwa =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

   let browser = 'Browser';
   if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
   else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
   else if (/Edg/i.test(ua)) browser = 'Edge';
   else if (/Firefox/i.test(ua)) browser = 'Firefox';

   return {
      os,
      browser,
      isMobile,
      isPwa,
      screenWidth: window.screen ? window.screen.width : 0,
      screenHeight: window.screen ? window.screen.height : 0,
   };
};

// Firestore REST API Helper: Converts plain JS object to Firestore document fields format
const toFirestoreDocument = obj => {
   const fields = {};
   for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val === null || val === undefined) {
         fields[key] = { nullValue: null };
      } else if (typeof val === 'string') {
         fields[key] = { stringValue: val };
      } else if (typeof val === 'number') {
         if (Number.isInteger(val)) {
            fields[key] = { integerValue: val.toString() };
         } else {
            fields[key] = { doubleValue: val };
         }
      } else if (typeof val === 'boolean') {
         fields[key] = { booleanValue: val };
      } else if (Array.isArray(val)) {
         fields[key] = {
            arrayValue: {
               values: val.map(item => ({ stringValue: String(item) })),
            },
         };
      } else if (typeof val === 'object') {
         fields[key] = { stringValue: JSON.stringify(val) };
      }
   }
   return { fields };
};

// Safe localStorage getter
const getLocalData = (key, fallback = []) => {
   try {
      if (typeof localStorage === 'undefined') return fallback;
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
   } catch (e) {
      return fallback;
   }
};

// Safe localStorage setter
const setLocalData = (key, data) => {
   try {
      if (typeof localStorage !== 'undefined') {
         localStorage.setItem(key, JSON.stringify(data));
      }
   } catch (e) {
      console.warn(`LocalStorage quota error for ${key}:`, e);
   }
};

/**
 * 1. Track App Connection & Active Session
 */
export const trackAppConnection = async () => {
   const platform = detectPlatform();
   const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
   const sessionData = {
      id: sessionId,
      os: platform.os,
      browser: platform.browser,
      isMobile: platform.isMobile,
      isPwa: platform.isPwa,
      screen: `${platform.screenWidth}x${platform.screenHeight}`,
      timestamp: new Date().toISOString(),
      dateStr: new Date().toLocaleDateString(),
      timeStr: new Date().toLocaleTimeString(),
   };

   // Update local store
   const sessions = getLocalData(TELEMETRY_SESSIONS_KEY, []);
   // Keep last 100 sessions
   sessions.unshift(sessionData);
   if (sessions.length > 100) sessions.length = 100;
   setLocalData(TELEMETRY_SESSIONS_KEY, sessions);

   // Sync to Firebase Firestore if configured
   if (isFirebaseConfigured()) {
      try {
         const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/app_sessions`;
         fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toFirestoreDocument(sessionData)),
         }).catch(err => console.debug('Firestore session log background ping:', err));
      } catch (e) {
         // Silently ignore network errors in background telemetry
      }
   }

   return sessionData;
};

/**
 * 2. Track User Login & Account Registration
 */
export const trackUserLogin = async user => {
   if (!user) return;
   const platform = detectPlatform();
   const loginRecord = {
      id: `usr_${Date.now()}`,
      name: user.name || 'Anonymous',
      email: user.email || 'N/A',
      role: user.role || 'Member',
      plan: user.plan || 'Free',
      os: platform.os,
      isMobile: platform.isMobile,
      timestamp: new Date().toISOString(),
      dateStr: new Date().toLocaleDateString(),
      timeStr: new Date().toLocaleTimeString(),
   };

   // Update local store
   const users = getLocalData(TELEMETRY_USERS_KEY, []);
   // Check if already in list by email
   const existingIndex = users.findIndex(u => u.email === loginRecord.email);
   if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...loginRecord };
   } else {
      users.unshift(loginRecord);
   }
   setLocalData(TELEMETRY_USERS_KEY, users);

   // Sync to Firebase Firestore if configured
   if (isFirebaseConfigured()) {
      try {
         const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/user_logins`;
         fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toFirestoreDocument(loginRecord)),
         }).catch(err => console.debug('Firestore user log ping:', err));
      } catch (e) {
         // Silently ignore
      }
   }
};

/**
 * 3. Track Search Queries for Search Improvement Analytics
 */
export const trackSearchQuery = async (query, resultsCount = 0) => {
   const trimmed = (query || '').trim();
   if (!trimmed || trimmed.length < 2) return;

   const platform = detectPlatform();
   const searchRecord = {
      id: `srch_${Date.now()}`,
      query: trimmed,
      resultsCount: Number(resultsCount) || 0,
      os: platform.os,
      timestamp: new Date().toISOString(),
      dateStr: new Date().toLocaleDateString(),
   };

   // Update local searches list
   const searches = getLocalData(TELEMETRY_SEARCH_KEY, []);
   searches.unshift(searchRecord);
   if (searches.length > 200) searches.length = 200;
   setLocalData(TELEMETRY_SEARCH_KEY, searches);

   // Sync to Firebase Firestore if configured
   if (isFirebaseConfigured()) {
      try {
         const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/search_analytics`;
         fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toFirestoreDocument(searchRecord)),
         }).catch(err => console.debug('Firestore search log ping:', err));
      } catch (e) {
         // Silently ignore
      }
   }
};

/**
 * 4. Submit User Feedback & Feature/Song Update Requests
 */
export const submitFeedback = async ({
   name = 'Harmoniq Listener',
   email = '',
   category = 'Feature Idea',
   rating = 5,
   message = '',
   currentTrack = null,
}) => {
   const platform = detectPlatform();
   const feedbackId = `fb_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

   const feedbackData = {
      id: feedbackId,
      name: (name || 'Harmoniq Listener').trim(),
      email: (email || '').trim(),
      category,
      rating: Number(rating) || 5,
      message: (message || '').trim(),
      trackInfo: currentTrack ? `${currentTrack.name || ''} - ${currentTrack.artist || ''}` : '',
      os: platform.os,
      browser: platform.browser,
      isMobile: platform.isMobile,
      timestamp: new Date().toISOString(),
      dateStr: new Date().toLocaleDateString(),
      timeStr: new Date().toLocaleTimeString(),
      status: 'new', // new | reviewed | completed
   };

   // Save in local feedback database
   const feedbacks = getLocalData(TELEMETRY_FEEDBACK_KEY, []);
   feedbacks.unshift(feedbackData);
   setLocalData(TELEMETRY_FEEDBACK_KEY, feedbacks);

   // Sync to Firebase Firestore if configured
   let cloudSynced = false;
   if (isFirebaseConfigured()) {
      try {
         const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/user_feedback`;
         const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toFirestoreDocument(feedbackData)),
         });
         cloudSynced = res.ok;
      } catch (e) {
         console.warn('Firestore feedback submit error:', e);
      }
   }

   return {
      success: true,
      feedback: feedbackData,
      cloudSynced,
   };
};

/**
 * 5. Fetch Full Aggregated Metrics for Creator Dashboard
 */
export const fetchAdminMetrics = async () => {
   const sessions = getLocalData(TELEMETRY_SESSIONS_KEY, []);
   const users = getLocalData(TELEMETRY_USERS_KEY, []);
   const searches = getLocalData(TELEMETRY_SEARCH_KEY, []);
   const feedbacks = getLocalData(TELEMETRY_FEEDBACK_KEY, []);

   // Platform statistics
   let mobileCount = 0;
   let desktopCount = 0;
   let iosCount = 0;
   let androidCount = 0;

   sessions.forEach(s => {
      if (s.isMobile) mobileCount++;
      else desktopCount++;

      if (s.os && s.os.includes('iOS')) iosCount++;
      if (s.os && s.os.includes('Android')) androidCount++;
   });

   // Top search terms aggregation
   const queryCounts = {};
   searches.forEach(s => {
      const q = s.query.toLowerCase();
      queryCounts[q] = (queryCounts[q] || 0) + 1;
   });

   const topSearches = Object.keys(queryCounts)
      .map(query => ({ query, count: queryCounts[query] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

   // Average rating
   const totalRating = feedbacks.reduce((sum, f) => sum + (f.rating || 5), 0);
   const avgRating = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : '5.0';

   return {
      totalVisits: sessions.length,
      activeUsersEstimate: Math.max(sessions.length, 1),
      registeredUsersCount: users.length,
      mobileVisits: mobileCount,
      desktopVisits: desktopCount,
      iosVisits: iosCount,
      androidVisits: androidCount,
      totalFeedbackCount: feedbacks.length,
      averageRating: avgRating,
      topSearches,
      recentSearches: searches.slice(0, 20),
      recentFeedbacks: feedbacks,
      recentLogins: users,
      isCloudConnected: isFirebaseConfigured(),
      projectId: FIREBASE_CONFIG.projectId || 'Local / Offline Sync Mode',
   };
};

/**
 * 6. Export Data to CSV (for Excel / Google Sheets)
 */
export const exportDataAsCsv = (dataType = 'feedback') => {
   let rows = [];
   let filename = `harmoniq_${dataType}_export.csv`;

   if (dataType === 'feedback') {
      const feedbacks = getLocalData(TELEMETRY_FEEDBACK_KEY, []);
      rows.push(['ID', 'Date', 'Time', 'Name', 'Email', 'Category', 'Rating', 'Message', 'Track Info', 'OS']);
      feedbacks.forEach(f => {
         rows.push([
            f.id,
            f.dateStr,
            f.timeStr,
            `"${(f.name || '').replace(/"/g, '""')}"`,
            `"${(f.email || '').replace(/"/g, '""')}"`,
            f.category,
            f.rating,
            `"${(f.message || '').replace(/"/g, '""')}"`,
            `"${(f.trackInfo || '').replace(/"/g, '""')}"`,
            f.os,
         ]);
      });
   } else if (dataType === 'searches') {
      const searches = getLocalData(TELEMETRY_SEARCH_KEY, []);
      rows.push(['Date', 'Query', 'Results Count', 'OS']);
      searches.forEach(s => {
         rows.push([
            s.dateStr,
            `"${(s.query || '').replace(/"/g, '""')}"`,
            s.resultsCount,
            s.os,
         ]);
      });
   } else if (dataType === 'sessions') {
      const sessions = getLocalData(TELEMETRY_SESSIONS_KEY, []);
      rows.push(['Session ID', 'Date', 'Time', 'OS', 'Browser', 'Mobile', 'PWA', 'Screen']);
      sessions.forEach(s => {
         rows.push([
            s.id,
            s.dateStr,
            s.timeStr,
            s.os,
            s.browser,
            s.isMobile ? 'Yes' : 'No',
            s.isPwa ? 'Yes' : 'No',
            s.screen,
         ]);
      });
   }

   const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
   const encodedUri = encodeURI(csvContent);
   const link = document.createElement('a');
   link.setAttribute('href', encodedUri);
   link.setAttribute('download', filename);
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
};
