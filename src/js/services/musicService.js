/**
 * HARMONIQ AUDIO & SEARCH SERVICE
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 * Digital Signature: 0x56414E534849-5341494E49-HARMONIQ-2026
 * Ultra-fast, reliable global search for Songs, Artists, and Albums.
 */

import CryptoJS from 'crypto-js';

// Curated Top Artists Catalog
export const CURATED_ARTISTS = [
  {
    id: 'cheema-y',
    name: 'Cheema Y',
    genre: 'Punjabi Hip-Hop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/71/fa/df/71fadf2f-5ead-cca4-157e-91d324e39e2d/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'diljit-dosanjh',
    name: 'Diljit Dosanjh',
    genre: 'Punjabi Pop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/80/7e/8e/807e8ef6-15f5-f772-5b9e-b9b5f543dc5d/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'sidhu-moose-wala',
    name: 'Sidhu Moose Wala',
    genre: 'Punjabi Legend',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/83/b4/2c/83b42cb0-6e47-e170-c0b8-07cb8126e7a2/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'karan-aujla',
    name: 'Karan Aujla',
    genre: 'Punjabi Pop / Rap',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9a/50/fb/9a50fbe7-fc55-15ff-35b9-7b3bf95a4ea0/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'ap-dhillon',
    name: 'AP Dhillon',
    genre: 'Indie / Punjabi',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/91/3a/0d/913a0db7-658b-c8c3-42e5-397a61d15c7f/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'shubh',
    name: 'Shubh',
    genre: 'Punjabi Hip-Hop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/37/e5/22/37e522ff-cfcf-48ad-8d5f-7f9999a0ea6a/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'arijit-singh',
    name: 'Arijit Singh',
    genre: 'Bollywood / Romantic',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/7d/13/a5/7d13a5a7-96a9-450a-9d90-df4f501254bf/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'coldplay',
    name: 'Coldplay',
    genre: 'Alternative Rock',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/10/7c/49/107c4933-bf46-6da6-c878-3dbb7eb75591/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'the-weeknd',
    name: 'The Weeknd',
    genre: 'R&B / Pop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d3/df/6a/d3df6a17-3bfd-384a-939e-bb0ff22ea99d/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    genre: 'Pop / Country',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3b/bc/be/3bbcbee2-c9db-0a44-469b-2495b5fa114f/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'drake',
    name: 'Drake',
    genre: 'Hip-Hop / Rap',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/4b/96/98/4b96987c-3f41-a64b-a7eb-6c17e3f6dc6e/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'eminem',
    name: 'Eminem',
    genre: 'Hip-Hop / Rap',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d1/2f/1b/d12f1bb6-1c8a-dbf9-2b0b-871ea00dcb7e/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'badshah',
    name: 'Badshah',
    genre: 'Indian Hip-Hop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ee/18/d3/ee18d3df-8230-ae3d-bb62-421714bcde13/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'yo-yo-honey-singh',
    name: 'Yo Yo Honey Singh',
    genre: 'Indian Hip-Hop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c7/2f/fb/c72ffb4b-6101-7603-c40d-d41cbf5ca35e/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'justin-bieber',
    name: 'Justin Bieber',
    genre: 'Pop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/05/85/3d/05853d9e-11df-521f-82bb-272e276be869/cover.jpg/600x600bb.jpg',
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    genre: 'Alternative Pop',
    role: 'Artist',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/43/40/a2/4340a2bb-e490-a3e9-74d6-8483b8e4c700/cover.jpg/600x600bb.jpg',
  },
];

function formatDuration(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return '3:00';
  const mins = Math.floor(totalSeconds / 60);
  const secs = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
  return `${mins}:${secs}`;
}

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'");
}

function sanitizeArtwork(url) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return 'images/default_artwork.svg';
  }
  let clean = url.trim();
  if (clean.includes('default-music') || clean.includes('artist-default')) {
    return 'images/default_artwork.svg';
  }
  if (clean.startsWith('http://')) {
    clean = clean.replace('http://', 'https://');
  }
  return clean.replace(/50x50/g, '500x500').replace(/150x150/g, '500x500');
}

export function decryptSaavnMediaUrl(enc) {
  if (!enc) return '';
  try {
    const key = CryptoJS.enc.Utf8.parse('38346591');
    const decrypted = CryptoJS.DES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(enc) },
      key,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
    const url = decrypted.toString(CryptoJS.enc.Utf8);
    if (!url) return '';
    return url.replace('_96.mp4', '_160.mp4');
  } catch (err) {
    return '';
  }
}

/**
 * Searches full-length songs via the high-fidelity Harmoniq audio engine
 */
export async function searchFullSongs(query) {
  const q = (query || '').trim();
  const searchTerm = q || 'Top Hits';

  // 1. Primary: Query the high-fidelity proxy backend for full-length songs
  try {
    const res = await fetch(`/api/search-full?q=${encodeURIComponent(searchTerm)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.results && data.results.length > 0) {
        return data.results;
      }
    }
  } catch (err) {
    console.warn('Backend full-length search error, checking client fallback:', err);
  }

  // 2. Client-side direct JioSaavn search + DES decryption (standalone/offline fallback)
  try {
    const directUrl = `https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=25&p=1&q=${encodeURIComponent(searchTerm)}`;
    const directRes = await fetch(directUrl);
    if (directRes.ok) {
      const data = await directRes.json();
      if (data && data.results && data.results.length > 0) {
        return data.results
          .map((song, idx) => {
            const streamUrl = decryptSaavnMediaUrl(
              song.more_info && song.more_info.encrypted_media_url
            );
            const duration = parseInt(
              (song.more_info && song.more_info.duration) || 0,
              10
            );
            return {
              id: String(song.id || idx),
              name: decodeHtml(song.title || song.song),
              artist: decodeHtml(
                (song.more_info &&
                  song.more_info.artistMap &&
                  song.more_info.artistMap.primary_artists &&
                  song.more_info.artistMap.primary_artists[0] &&
                  song.more_info.artistMap.primary_artists[0].name) ||
                  song.subtitle ||
                  'Unknown Artist'
              ),
              album: decodeHtml(
                (song.more_info && song.more_info.album) || 'Single'
              ),
              duration: duration,
              durationStr: formatDuration(duration),
              track: idx + 1,
              url: streamUrl,
              artwork: sanitizeArtwork(song.image),
              isFullLength: true,
            };
          })
          .filter(s => s.url && s.url.startsWith('http'));
      }
    }
  } catch (directErr) {
    // ignore
  }

  // 3. Fallback to matching curated artists songs
  const lowerQ = searchTerm.toLowerCase();
  const matchedCurated = CURATED_ARTISTS.filter(a => a.name.toLowerCase().includes(lowerQ));
  if (matchedCurated.length > 0) {
    return matchedCurated.map((artist, idx) => ({
      id: `curated-${artist.id}`,
      name: `${artist.name} Greatest Hits`,
      artist: artist.name,
      album: `${artist.name} Collection`,
      track: idx + 1,
      url: 'https://aac.saavncdn.com/254/6ebc38a6a7ea892f3a27cd66c71529d6_160.mp4',
      duration: 266,
      durationStr: '4:26',
      artwork: artist.image,
      isFullLength: true,
    }));
  }

  return [];
}

/**
 * Returns curated artists list for homepage and search suggestions
 */
export async function fetchCuratedArtists() {
  try {
    const res = await fetch('/api/artists');
    if (res.ok) {
      const data = await res.json();
      if (data && data.artists && data.artists.length > 0) {
        return data.artists.map(a => ({
          id: a.artist.toLowerCase().replace(/\s+/g, '-'),
          name: a.artist,
          genre: a.genre || 'Worldwide Music',
          role: 'Artist',
          image: a.image || 'images/default_artwork.svg',
        }));
      }
    }
  } catch (e) {
    // ignore
  }
  return CURATED_ARTISTS;
}

/**
 * Searches artists worldwide using the full-length music engine
 */
export async function searchArtists(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q || q === 'top hits') {
    return fetchCuratedArtists();
  }

  const results = [];
  const seenNames = new Set();

  // 1. Check curated artists first for exact or partial matches
  for (const artist of CURATED_ARTISTS) {
    if (artist.name.toLowerCase().includes(q)) {
      results.push(artist);
      seenNames.add(artist.name.toLowerCase());
    }
  }

  // 2. Query /api/artist/search for worldwide artists
  try {
    const res = await fetch(`/api/artist/search?q=${encodeURIComponent(q)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.artists) {
        for (const item of data.artists) {
          const lowerName = (item.artist || '').toLowerCase().trim();
          if (lowerName && !seenNames.has(lowerName)) {
            seenNames.add(lowerName);
            const curatedMatch = CURATED_ARTISTS.find(a => a.name.toLowerCase() === lowerName);
            results.push({
              id: String(item.id || lowerName),
              name: item.artist,
              genre: item.genre || 'Worldwide Music',
              role: item.role || 'Artist',
              image: curatedMatch ? curatedMatch.image : (item.image || 'images/default_artwork.svg'),
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn('Artist search error:', err);
  }

  // 3. Fallback: search full songs and extract artist names
  if (results.length === 0) {
    try {
      const songs = await searchFullSongs(q);
      for (const song of songs) {
        const lowerName = (song.artist || '').toLowerCase().trim();
        if (lowerName && !seenNames.has(lowerName)) {
          seenNames.add(lowerName);
          results.push({
            id: `extracted-${lowerName}`,
            name: song.artist,
            genre: 'Artist',
            role: 'Artist',
            image: song.artwork || 'images/default_artwork.svg',
          });
          if (results.length >= 8) break;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return results;
}

/**
 * Fetches artist details (full-length top songs & complete discography albums)
 */
export async function fetchArtistDetails(artistName) {
  if (!artistName) return { albums: [], topSongs: [] };

  try {
    const res = await fetch(`/api/artist-details?artist=${encodeURIComponent(artistName)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.topSongs || data.albums)) {
        return {
          artist: data.artist || artistName,
          artistImage: data.artistImage || 'images/default_artwork.svg',
          albums: (data.albums || []).map(a => ({
            id: String(a.id || a.album),
            title: a.album,
            album: a.album,
            artist: a.artist || artistName,
            artwork: a.artwork || 'images/default_artwork.svg',
            year: a.year || '',
            trackCount: a.trackCount || 1,
          })),
          topSongs: (data.topSongs || []).map((song, idx) => ({
            id: String(song.id || idx),
            name: song.name,
            artist: song.artist || artistName,
            album: song.album || 'Single',
            track: song.track || idx + 1,
            url: song.url,
            duration: song.duration,
            durationStr: song.durationStr || formatDuration(song.duration),
            artwork: song.artwork || 'images/default_artwork.svg',
            isFullLength: true,
          })),
        };
      }
    }
  } catch (err) {
    console.warn('Error fetching artist details from proxy:', err);
  }

  // Fallback: search full songs with artist name
  try {
    const songs = await searchFullSongs(artistName);
    return {
      artist: artistName,
      artistImage: songs.length ? songs[0].artwork : 'images/default_artwork.svg',
      albums: [],
      topSongs: songs,
    };
  } catch (e) {
    return { albums: [], topSongs: [] };
  }
}

/**
 * Fetches full-length tracks for an album
 */
export async function fetchAlbumDetails({ album = '', artist = '', id = '' }) {
  try {
    const queryParams = new URLSearchParams();
    if (album) queryParams.append('album', album);
    if (artist) queryParams.append('artist', artist);
    if (id) queryParams.append('id', id);

    const res = await fetch(`/api/album-details?${queryParams.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.tracks && data.tracks.length > 0) {
        return {
          album: data.album || album,
          artist: data.artist || artist,
          year: data.year || '',
          artwork: data.artwork || 'images/default_artwork.svg',
          tracks: data.tracks.map((song, idx) => ({
            id: String(song.id || idx),
            name: song.name,
            artist: song.artist || artist,
            album: song.album || data.album || album,
            track: song.track || idx + 1,
            url: song.url,
            duration: song.duration,
            durationStr: song.durationStr || formatDuration(song.duration),
            artwork: song.artwork || data.artwork || 'images/default_artwork.svg',
            isFullLength: true,
          })),
        };
      }
    }
  } catch (err) {
    console.warn('Error fetching album details from proxy:', err);
  }

  // Fallback: search full songs with album / artist query
  const term = `${artist} ${album}`.trim() || album || artist;
  if (!term) return { tracks: [] };

  try {
    const songs = await searchFullSongs(term);
    return { tracks: songs };
  } catch (err) {
    console.warn('Error fallback album details:', err);
  }

  return { tracks: [] };
}
