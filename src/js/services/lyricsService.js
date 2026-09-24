/**
 * HARMONIQ SYNCHRONIZED LYRICS ENGINE
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 * Digital Signature: 0x56414E534849-5341494E49-HARMONIQ-2026
 * Handles LRC parsing, LRCLIB API queries, caching, and synchronized lyrics.
 */

import {
   MULTI_LANG_CATALOG,
   translateLrcLines,
   transliterateText,
} from './lyricsTranslationService.js';

// Parses standard LRC string into an array of { time: seconds, text: string }
export const parseLrc = lrcString => {
   if (!lrcString || typeof lrcString !== 'string') return [];

   const lines = lrcString.split('\n');
   const timeRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
   const parsed = [];

   for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Skip metadata tags like [ar:Artist], [ti:Title], [length:03:45], etc.
      if (/^\[(ar|ti|al|by|offset|length|re|ve):.*\]$/i.test(trimmed)) {
         continue;
      }

      // Collect all timestamps on this line
      const matches = [...trimmed.matchAll(timeRegex)];
      if (matches.length > 0) {
         // The lyric text is everything after the last timestamp
         const text = trimmed.replace(timeRegex, '').trim();

         for (const match of matches) {
            const minutes = parseInt(match[1], 10);
            const seconds = parseInt(match[2], 10);
            const milliseconds = match[3]
               ? parseFloat('0.' + match[3])
               : 0;

            const time = minutes * 60 + seconds + milliseconds;
            parsed.push({ time, text: text || '♪' });
         }
      }
   }

   // Sort lines by timestamp ascending
   parsed.sort((a, b) => a.time - b.time);
   return parsed;
};

// Built-in sample synced lyrics for featured demo tracks
const DEMO_LYRICS = {
   'coldplay - yellow': `[00:00.00] ♪ (Intro)
[00:35.66] Look at the stars
[00:38.46] Look how they shine for you
[00:44.17] And everything you do
[00:49.66] Yeah, they were all yellow
[00:52.66] I came along
[00:55.42] I wrote a song for you
[01:00.69] And all the things you do
[01:06.24] And it was called "Yellow"
[01:13.25] So then I took my turn
[01:17.25] Oh, what a thing to have done
[01:22.48] And it was all yellow
[01:30.73] Your skin, oh, yeah, your skin and bones
[01:36.72] Turn into something beautiful
[01:42.34] And you know, you know I love you so
[01:50.51] You know I love you so
[01:57.00] ♪ (Instrumental)
[02:15.48] I swam across
[02:18.18] I jumped across for you
[02:23.32] Oh, what a thing to do
[02:29.14] 'Cause you were all yellow
[02:32.03] I drew a line
[02:34.91] I drew a line for you
[02:40.30] Oh, what a thing to do
[02:45.91] And it was all yellow
[02:53.74] And your skin, oh, yeah, your skin and bones
[02:59.77] Turn into something beautiful
[03:05.35] And you know, for you, I'd bleed myself dry
[03:13.63] For you, I'd bleed myself dry
[03:20.00] ♪ (Guitar Solo)
[03:37.82] It's true
[03:41.18] Look how they shine for you
[03:46.70] Look how they shine for you
[03:52.11] Look how they shine for
[03:57.84] Look how they shine for you
[04:03.26] Look how they shine for you
[04:09.07] Look how they shine
[04:11.90] Look at the stars
[04:14.33] Look how they shine for you
[04:19.99] And all the things that you do`,

   'the weeknd - blinding lights': `[00:00.00] ♪ (Synth Intro)
[00:13.20] Yeah
[00:15.80] I've been tryna call
[00:18.60] I've been on my own for long enough
[00:22.90] Maybe you can show me how to love, maybe
[00:29.80] I'm going through withdrawals
[00:33.40] You don't even have to do too much
[00:37.20] You can turn me on with just a touch, baby
[00:44.20] I look around and Sin City's cold and empty
[00:50.00] No one's around to judge me
[00:54.20] I can't see clearly when you're gone
[00:58.80] I said, ooh, I'm blinded by the lights
[01:06.10] No, I can't sleep until I feel your touch
[01:13.30] I said, ooh, I'm drowning in the night
[01:20.80] Oh, when I'm like this, you're the one I trust
[01:28.00] Hey, hey, hey
[01:31.20] I'm running out of time
[01:34.50] 'Cause I can see the sun light up the sky
[01:38.80] So I hit the road in overdrive, baby
[01:45.90] The city's cold and empty
[01:51.50] No one's around to judge me
[01:55.70] I can't see clearly when you're gone
[02:00.30] I said, ooh, I'm blinded by the lights
[02:07.80] No, I can't sleep until I feel your touch
[02:15.00] I said, ooh, I'm drowning in the night
[02:22.30] Oh, when I'm like this, you're the one I trust
[02:30.00] I'm just walking by to let you know
[02:34.20] I could never say it on the phone
[02:37.80] Will never let you go this time
[02:44.00] I said, ooh, I'm blinded by the lights
[02:51.40] No, I can't sleep until I feel your touch
[03:00.00] Hey, hey, hey`,

   'harmoniq - vanshi saini': `[00:00.00] 🎵 Welcome to Harmoniq
[00:03.50] Experience music like never before
[00:07.20] Created by VANSHI SAINI
[00:11.80] Sleek design, synchronized lyrics, seamless sound
[00:16.50] Watch every line highlight as the beat flows
[00:21.00] Click any lyric line to jump right to that moment
[00:26.50] Enjoy your music with Harmoniq!`,
};

// Track key helper
export const getTrackKey = (artist = '', title = '') => {
   return `${(artist || '').toLowerCase().trim()} - ${(title || '').toLowerCase().trim()}`;
};

// Save custom lyrics locally (with optional language tag)
export const saveCustomLyrics = (trackKey, lyricsText, lang = null) => {
   try {
      if (lang) {
         localStorage.setItem(`harmoniq_lyrics_${trackKey}_${lang}`, lyricsText);
      }
      localStorage.setItem(`harmoniq_lyrics_${trackKey}`, lyricsText);
   } catch (e) {
      console.warn('Could not save custom lyrics:', e);
   }
};

// Get custom lyrics from localStorage
export const getCustomLyrics = trackKey => {
   try {
      return localStorage.getItem(`harmoniq_lyrics_${trackKey}`);
   } catch (e) {
      return null;
   }
};

/**
 * Fetch lyrics for a track with multi-language (English, Hindi, Punjabi) support.
 * 1. Check custom user-saved lyrics in localStorage (per language or general).
 * 2. Check curated multi-language catalog (English, Hindi, Punjabi).
 * 3. Check built-in demo synced lyrics.
 * 4. Fetch from LRCLIB API and dynamically translate/transliterate.
 */
export const fetchLyrics = async ({
   artist = '',
   title = '',
   album = '',
   duration = 0,
   lang = 'en',
}) => {
   const cleanArtist = (artist || '').trim();
   const cleanTitle = (title || '').trim();
   const trackKey = getTrackKey(cleanArtist, cleanTitle);

   // 1. Check custom language-specific lyrics first
   const customLangKey = `${trackKey}_${lang}`;
   const customLangLyrics = getCustomLyrics(customLangKey);
   if (customLangLyrics) {
      const parsed = parseLrc(customLangLyrics);
      if (parsed.length > 0) {
         return { isSynced: true, lines: parsed, raw: customLangLyrics, source: 'custom', lang };
      }
      return { isSynced: false, plainText: customLangLyrics, raw: customLangLyrics, source: 'custom', lang };
   }

   // 2. Check general custom lyrics
   const customLyrics = getCustomLyrics(trackKey);
   if (customLyrics) {
      const parsed = parseLrc(customLyrics);
      if (parsed.length > 0) {
         const lines = lang === 'en' ? parsed : translateLrcLines(parsed, lang, trackKey);
         return { isSynced: true, lines, raw: customLyrics, source: 'custom', lang };
      }
      const plainText = lang === 'en' ? customLyrics : transliterateText(customLyrics, lang);
      return { isSynced: false, plainText, raw: customLyrics, source: 'custom', lang };
   }

   // 3. Check curated MULTI_LANG_CATALOG
   for (const [key, pack] of Object.entries(MULTI_LANG_CATALOG)) {
      if (trackKey.includes(key) || key.includes(trackKey) || (cleanTitle && key.includes(cleanTitle.toLowerCase()))) {
         if (pack[lang]) {
            const parsed = parseLrc(pack[lang]);
            if (parsed.length > 0) {
               return { isSynced: true, lines: parsed, raw: pack[lang], source: 'catalog', lang };
            }
         }
      }
   }

   // 4. Check DEMO_LYRICS (fallback to translation if lang !== 'en')
   if (DEMO_LYRICS[trackKey]) {
      const parsed = parseLrc(DEMO_LYRICS[trackKey]);
      const lines = lang === 'en' ? parsed : translateLrcLines(parsed, lang, trackKey);
      return { isSynced: true, lines, raw: DEMO_LYRICS[trackKey], source: 'bundled', lang };
   }

   for (const key of Object.keys(DEMO_LYRICS)) {
      if (cleanTitle && (key.includes(cleanTitle.toLowerCase()) || cleanTitle.toLowerCase().includes(key))) {
         const parsed = parseLrc(DEMO_LYRICS[key]);
         const lines = lang === 'en' ? parsed : translateLrcLines(parsed, lang, trackKey);
         return { isSynced: true, lines, raw: DEMO_LYRICS[key], source: 'bundled', lang };
      }
   }

   // 5. Query public LRCLIB API and dynamically translate
   if (cleanArtist && cleanTitle) {
      try {
         let url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(cleanArtist)}&track_name=${encodeURIComponent(cleanTitle)}`;
         if (album) {
            url += `&album_name=${encodeURIComponent(album)}`;
         }
         if (duration && duration > 0) {
            url += `&duration=${Math.round(duration)}`;
         }

         const res = await fetch(url);
         if (res.ok) {
            const data = await res.json();
            if (data.syncedLyrics) {
               const parsed = parseLrc(data.syncedLyrics);
               const lines = lang === 'en' ? parsed : translateLrcLines(parsed, lang, trackKey);
               return {
                  isSynced: true,
                  lines,
                  raw: data.syncedLyrics,
                  source: 'lrclib',
                  lang,
               };
            } else if (data.plainLyrics) {
               const plainText = lang === 'en' ? data.plainLyrics : transliterateText(data.plainLyrics, lang);
               return {
                  isSynced: false,
                  plainText,
                  raw: data.plainLyrics,
                  source: 'lrclib',
                  lang,
               };
            }
         }

         // Search fallback on LRCLIB
         const searchRes = await fetch(
            `https://lrclib.net/api/search?q=${encodeURIComponent(cleanArtist + ' ' + cleanTitle)}`
         );
         if (searchRes.ok) {
            const searchData = await searchRes.json();
            if (Array.isArray(searchData) && searchData.length > 0) {
               const match = searchData.find(item => item.syncedLyrics) || searchData[0];
               if (match && match.syncedLyrics) {
                  const parsed = parseLrc(match.syncedLyrics);
                  const lines = lang === 'en' ? parsed : translateLrcLines(parsed, lang, trackKey);
                  return {
                     isSynced: true,
                     lines,
                     raw: match.syncedLyrics,
                     source: 'lrclib',
                     lang,
                  };
               } else if (match && match.plainLyrics) {
                  const plainText = lang === 'en' ? match.plainLyrics : transliterateText(match.plainLyrics, lang);
                  return {
                     isSynced: false,
                     plainText,
                     raw: match.plainLyrics,
                     source: 'lrclib',
                     lang,
                  };
               }
            }
         }
      } catch (err) {
         console.warn('LRCLIB fetch error:', err);
      }
   }

   return null;
};
