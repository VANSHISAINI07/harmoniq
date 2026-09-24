const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
const os = require('os');

function decryptSaavnUrl(enc) {
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

// Curated roster of 60+ world-famous artists with signature profile photos
const FEATURED_ARTISTS = [
  // Pop Icons
  { artist: 'Taylor Swift', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Taylor_Swift_500x500.jpg' },
  { artist: 'The Weeknd', genre: 'R&B / Pop', image: 'https://c.saavncdn.com/artists/The_Weeknd_002_20241003071400_500x500.jpg' },
  { artist: 'Ed Sheeran', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Ed_Sheeran_500x500.jpg' },
  { artist: 'Ariana Grande', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Ariana_Grande_500x500.jpg' },
  { artist: 'Justin Bieber', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Justin_Bieber_500x500.jpg' },
  { artist: 'Dua Lipa', genre: 'Pop / Dance', image: 'https://c.saavncdn.com/artists/Dua_Lipa_002_20240502052516_500x500.jpg' },
  { artist: 'Billie Eilish', genre: 'Alternative / Pop', image: 'https://c.saavncdn.com/artists/Billie_Eilish_002_20240517064243_500x500.jpg' },
  { artist: 'Bruno Mars', genre: 'Pop / Funk', image: 'https://c.saavncdn.com/artists/Bruno_Mars_500x500.jpg' },
  { artist: 'Adele', genre: 'Soul / Pop', image: 'https://c.saavncdn.com/artists/Adele_500x500.jpg' },
  { artist: 'Olivia Rodrigo', genre: 'Pop / Rock', image: 'https://c.saavncdn.com/artists/Olivia_Rodrigo_500x500.jpg' },
  { artist: 'Harry Styles', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Harry_Styles_500x500.jpg' },
  { artist: 'Katy Perry', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Katy_Perry_500x500.jpg' },
  { artist: 'Rihanna', genre: 'R&B / Pop', image: 'https://c.saavncdn.com/artists/Rihanna_500x500.jpg' },
  { artist: 'Lady Gaga', genre: 'Pop / Dance', image: 'https://c.saavncdn.com/artists/Lady_Gaga_500x500.jpg' },
  { artist: 'Shawn Mendes', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Shawn_Mendes_500x500.jpg' },
  { artist: 'Selena Gomez', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Selena_Gomez_500x500.jpg' },
  { artist: 'Charlie Puth', genre: 'Pop', image: 'https://c.saavncdn.com/artists/Charlie_Puth_500x500.jpg' },
  { artist: 'Miley Cyrus', genre: 'Pop / Rock', image: 'https://c.saavncdn.com/artists/Miley_Cyrus_500x500.jpg' },

  // Rock, Alternative & Bands
  { artist: 'Coldplay', genre: 'Alternative / Rock', image: 'https://c.saavncdn.com/artists/Coldplay_500x500.jpg' },
  { artist: 'Imagine Dragons', genre: 'Alternative / Rock', image: 'https://c.saavncdn.com/artists/Imagine_Dragons_500x500.jpg' },
  { artist: 'Queen', genre: 'Classic Rock', image: 'https://c.saavncdn.com/artists/Queen_500x500.jpg' },
  { artist: 'Linkin Park', genre: 'Rock / Metal', image: 'https://c.saavncdn.com/artists/Linkin_Park_500x500.jpg' },
  { artist: 'Maroon 5', genre: 'Pop / Rock', image: 'https://c.saavncdn.com/artists/Maroon_5_500x500.jpg' },
  { artist: 'OneRepublic', genre: 'Pop / Rock', image: 'https://c.saavncdn.com/artists/OneRepublic_500x500.jpg' },
  { artist: 'Arctic Monkeys', genre: 'Indie Rock', image: 'https://c.saavncdn.com/artists/Arctic_Monkeys_500x500.jpg' },
  { artist: 'Green Day', genre: 'Punk Rock', image: 'https://c.saavncdn.com/artists/Green_Day_500x500.jpg' },
  { artist: 'The Beatles', genre: 'Classic Rock', image: 'https://c.saavncdn.com/artists/The_Beatles_500x500.jpg' },
  { artist: 'Nirvana', genre: 'Grunge / Rock', image: 'https://c.saavncdn.com/artists/Nirvana_500x500.jpg' },

  // Hip-Hop & Rap
  { artist: 'Drake', genre: 'Hip-Hop / Rap', image: 'https://c.saavncdn.com/artists/Drake_500x500.jpg' },
  { artist: 'Eminem', genre: 'Hip-Hop / Rap', image: 'https://c.saavncdn.com/artists/Eminem_500x500.jpg' },
  { artist: 'Travis Scott', genre: 'Hip-Hop / Trap', image: 'https://c.saavncdn.com/artists/Travis_Scott_500x500.jpg' },
  { artist: 'Kendrick Lamar', genre: 'Hip-Hop / Rap', image: 'https://c.saavncdn.com/artists/Kendrick_Lamar_500x500.jpg' },
  { artist: 'Post Malone', genre: 'Hip-Hop / Pop', image: 'https://c.saavncdn.com/artists/Post_Malone_500x500.jpg' },
  { artist: 'Kanye West', genre: 'Hip-Hop / Rap', image: 'https://c.saavncdn.com/artists/Kanye_West_500x500.jpg' },
  { artist: 'J. Cole', genre: 'Hip-Hop / Rap', image: 'https://c.saavncdn.com/artists/J._Cole_500x500.jpg' },
  { artist: 'Jack Harlow', genre: 'Hip-Hop', image: 'https://c.saavncdn.com/artists/Jack_Harlow_500x500.jpg' },
  { artist: 'Juice WRLD', genre: 'Hip-Hop / Emo Rap', image: 'https://c.saavncdn.com/artists/Juice_WRLD_500x500.jpg' },
  { artist: 'XXXTentacion', genre: 'Hip-Hop / Alternative', image: 'https://c.saavncdn.com/artists/XXXTentacion_500x500.jpg' },

  // Indian & Punjabi
  { artist: 'Arijit Singh', genre: 'Bollywood / Soul', image: 'https://c.saavncdn.com/artists/Arijit_Singh_004_20241118063717_500x500.jpg' },
  { artist: 'Diljit Dosanjh', genre: 'Punjabi / Pop', image: 'https://c.saavncdn.com/artists/Diljit_Dosanjh_005_20240417065053_500x500.jpg' },
  { artist: 'Karan Aujla', genre: 'Punjabi / Hip-Hop', image: 'https://c.saavncdn.com/artists/Karan_Aujla_004_20240822064903_500x500.jpg' },
  { artist: 'Sidhu Moose Wala', genre: 'Punjabi / Rap', image: 'https://c.saavncdn.com/artists/Sidhu_Moose_Wala_003_20230517053531_500x500.jpg' },
  { artist: 'AP Dhillon', genre: 'Punjabi / Pop', image: 'https://c.saavncdn.com/artists/AP_Dhillon_003_20230809071510_500x500.jpg' },
  { artist: 'Shreya Ghoshal', genre: 'Bollywood / Classical', image: 'https://c.saavncdn.com/artists/Shreya_Ghoshal_004_20230315054949_500x500.jpg' },
  { artist: 'Atif Aslam', genre: 'Bollywood / Pop', image: 'https://c.saavncdn.com/artists/Atif_Aslam_500x500.jpg' },
  { artist: 'A.R. Rahman', genre: 'Composer / World', image: 'https://c.saavncdn.com/artists/A.R._Rahman_500x500.jpg' },
  { artist: 'Badshah', genre: 'Bollywood / Rap', image: 'https://c.saavncdn.com/artists/Badshah_005_20240319060636_500x500.jpg' },
  { artist: 'Yo Yo Honey Singh', genre: 'Punjabi / Rap', image: 'https://c.saavncdn.com/artists/Yo_Yo_Honey_Singh_002_20231024061559_500x500.jpg' },
  { artist: 'Anuv Jain', genre: 'Indie / Acoustic', image: 'https://c.saavncdn.com/artists/Anuv_Jain_002_20230606060149_500x500.jpg' },
  { artist: 'Pritam', genre: 'Bollywood / Composer', image: 'https://c.saavncdn.com/artists/Pritam_500x500.jpg' },
  { artist: 'Jubin Nautiyal', genre: 'Bollywood / Pop', image: 'https://c.saavncdn.com/artists/Jubin_Nautiyal_003_20230623063001_500x500.jpg' },
  { artist: 'Neha Kakkar', genre: 'Bollywood / Pop', image: 'https://c.saavncdn.com/artists/Neha_Kakkar_006_20230606060249_500x500.jpg' },

  // EDM & Electronic
  { artist: 'Alan Walker', genre: 'EDM / Dance', image: 'https://c.saavncdn.com/artists/Alan_Walker_500x500.jpg' },
  { artist: 'Avicii', genre: 'EDM / Progressive', image: 'https://c.saavncdn.com/artists/Avicii_500x500.jpg' },
  { artist: 'The Chainsmokers', genre: 'EDM / Pop', image: 'https://c.saavncdn.com/artists/The_Chainsmokers_500x500.jpg' },
  { artist: 'Marshmello', genre: 'EDM / Dance', image: 'https://c.saavncdn.com/artists/Marshmello_500x500.jpg' },
  { artist: 'Calvin Harris', genre: 'EDM / Dance', image: 'https://c.saavncdn.com/artists/Calvin_Harris_500x500.jpg' },
  { artist: 'David Guetta', genre: 'EDM / Dance', image: 'https://c.saavncdn.com/artists/David_Guetta_500x500.jpg' },
  { artist: 'Martin Garrix', genre: 'EDM / House', image: 'https://c.saavncdn.com/artists/Martin_Garrix_500x500.jpg' },

  // Project Owner
  { artist: 'VANSHI SAINI', genre: 'Harmoniq Creator', image: 'images/default_artwork.svg' },
];

module.exports = function(app) {
  // Global Creator Signature & License Security Headers
  app.use('/api', (req, res, next) => {
    res.setHeader('X-Harmoniq-Creator', 'VANSHI SAINI');
    res.setHeader('X-Harmoniq-License', 'Copyright (c) 2026 VANSHI SAINI. All Rights Reserved.');
    res.setHeader('X-Creator-Signature', '0x56414E534849-5341494E49-HARMONIQ-2026');
    next();
  });

  // Dynamic Network & Tunnel Diagnostic Endpoint
  app.get('/api/network-info', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let lanIp = '127.0.0.1';
    try {
      const nets = os.networkInterfaces();
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal) {
            lanIp = net.address;
            break;
          }
        }
      }
    } catch (e) {}

    let statusData = {
      targetUrl: 'https://harmoniq-player-vanshi.loca.lt',
      currentUrl: 'https://harmoniq-player-vanshi.loca.lt',
      isExactMatch: true,
      isOnline: true,
      lanIp: lanIp,
      publicIp: '',
      updatedAt: new Date().toISOString()
    };

    const statusFilePath = path.join(__dirname, 'tunnel-status.json');
    if (fs.existsSync(statusFilePath)) {
      try {
        const fileContent = JSON.parse(fs.readFileSync(statusFilePath, 'utf8'));
        statusData = { ...statusData, ...fileContent, lanIp: lanIp };
      } catch (e) {}
    }

    return res.json(statusData);
  });

  // 1. Search full-length songs
  app.get('/api/search-full', async (req, res) => {
    const query = req.query.q || '';
    if (!query.trim()) {
      return res.json({ results: [] });
    }
    try {
      const url =
        'https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=25&p=1&q=' +
        encodeURIComponent(query);
      const resp = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          cookie: 'L=english;'
        }
      });
      const data = await resp.json();
      const results = (data.results || [])
        .map((song, idx) => {
          const streamUrl = decryptSaavnUrl(
            song.more_info && song.more_info.encrypted_media_url
          );
          const duration = parseInt(
            (song.more_info && song.more_info.duration) || 0,
            10
          );
          const minutes = Math.floor(duration / 60);
          const seconds = String(duration % 60).padStart(2, '0');
          return {
            id: song.id,
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
            durationStr: `${minutes}:${seconds}`,
            track: idx + 1,
            url: streamUrl,
            artwork: sanitizeArtwork(song.image),
            isFullLength: true
          };
        })
        .filter(s => s.url && s.url.startsWith('http'));

      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.json({ results });
    } catch (err) {
      console.error('Error proxying music search:', err);
      return res.status(500).json({ error: err.message, results: [] });
    }
  });

  // 2. Curated Artists List with Signature Pictures
  app.get('/api/artists', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json({ artists: FEATURED_ARTISTS });
  });

  // 3. Search Any Artist Worldwide (with signature profile photos)
  app.get('/api/artist/search', async (req, res) => {
    const query = req.query.q || '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!query.trim()) {
      return res.json({ artists: FEATURED_ARTISTS });
    }
    try {
      const url =
        'https://www.jiosaavn.com/api.php?__call=search.getArtistResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&p=1&q=' +
        encodeURIComponent(query.trim());
      const resp = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          cookie: 'L=english;'
        }
      });
      const data = await resp.json();
      const artists = (data.results || []).map(a => ({
        id: a.id,
        artist: decodeHtml(a.name),
        image: sanitizeArtwork(a.image),
        role: a.role || 'Artist',
        genre: 'Worldwide Music'
      }));
      return res.json({ artists });
    } catch (err) {
      console.error('Error searching artists:', err);
      return res.status(500).json({ error: err.message, artists: [] });
    }
  });

  // 4. Get Artist Details (Complete Discography of Albums & Singles)
  app.get('/api/artist-details', async (req, res) => {
    const artistName = req.query.artist || '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (!artistName.trim()) {
      return res.json({ albums: [], topSongs: [] });
    }
    try {
      // Step A: Find artist ID
      const searchUrl =
        'https://www.jiosaavn.com/api.php?__call=search.getArtistResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=3&p=1&q=' +
        encodeURIComponent(artistName.trim());
      const sResp = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          cookie: 'L=english;'
        }
      });
      const sData = await sResp.json();
      const artistObj = sData.results && sData.results[0];

      if (!artistObj) {
        // Fallback to album search
        const albSearch =
          'https://www.jiosaavn.com/api.php?__call=search.getAlbumResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=15&p=1&q=' +
          encodeURIComponent(artistName.trim());
        const aResp = await fetch(albSearch, {
          headers: { 'User-Agent': 'Mozilla/5.0', cookie: 'L=english;' }
        });
        const aData = await aResp.json();
        const albums = (aData.results || []).map(a => ({
          id: a.id,
          album: decodeHtml(a.title),
          artist: artistName,
          artwork: sanitizeArtwork(a.image),
          year: a.year || ''
        }));
        return res.json({ albums, topSongs: [], artistImage: 'images/default_artwork.svg' });
      }

      // Step B: Get artist page details
      const pageUrl =
        'https://www.jiosaavn.com/api.php?__call=artist.getArtistPageDetails&_format=json&_marker=0&api_version=4&ctx=web6dot0&artistId=' +
        artistObj.id +
        '&n_song=25&n_album=25';
      const pResp = await fetch(pageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', cookie: 'L=english;' }
      });
      const pData = await pResp.json();

      const combinedAlbums = [
        ...(pData.topAlbums || []),
        ...(pData.singles || [])
      ];

      // Deduplicate albums by title
      const seenTitles = new Set();
      const albums = [];
      for (const a of combinedAlbums) {
        const title = decodeHtml(a.title);
        if (!seenTitles.has(title.toLowerCase())) {
          seenTitles.add(title.toLowerCase());
          albums.push({
            id: a.id,
            album: title,
            artist: artistName,
            artwork: sanitizeArtwork(a.image),
            year: a.year || ''
          });
        }
      }

      const topSongs = (pData.topSongs || [])
        .map((song, idx) => {
          const streamUrl = decryptSaavnUrl(
            song.more_info && song.more_info.encrypted_media_url
          );
          const duration = parseInt(
            (song.more_info && song.more_info.duration) || 0,
            10
          );
          const minutes = Math.floor(duration / 60);
          const seconds = String(duration % 60).padStart(2, '0');
          return {
            id: song.id,
            name: decodeHtml(song.title || song.song),
            artist: artistName,
            album: decodeHtml((song.more_info && song.more_info.album) || 'Single'),
            duration: duration,
            durationStr: `${minutes}:${seconds}`,
            track: idx + 1,
            url: streamUrl,
            artwork: sanitizeArtwork(song.image),
            isFullLength: true
          };
        })
        .filter(s => s.url && s.url.startsWith('http'));

      return res.json({
        artist: artistName,
        artistImage: sanitizeArtwork(artistObj.image),
        albums,
        topSongs
      });
    } catch (err) {
      console.error('Error fetching artist details:', err);
      return res.status(500).json({ error: err.message, albums: [], topSongs: [] });
    }
  });

  // 5. Get Album Details (All Songs of the Album in Full Length)
  app.get('/api/album-details', async (req, res) => {
    const albumName = req.query.album || '';
    const artistName = req.query.artist || '';
    const albumId = req.query.id || '';
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      let resolvedId = albumId;

      // If ID not provided, search for the album
      if (!resolvedId) {
        const searchQ = `${artistName} ${albumName}`.trim();
        const sUrl =
          'https://www.jiosaavn.com/api.php?__call=search.getAlbumResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=3&p=1&q=' +
          encodeURIComponent(searchQ);
        const sResp = await fetch(sUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0', cookie: 'L=english;' }
        });
        const sData = await sResp.json();
        if (sData.results && sData.results.length > 0) {
          resolvedId = sData.results[0].id;
        }
      }

      if (!resolvedId) {
        return res.json({ tracks: [] });
      }

      // Fetch all tracks of this album
      const dUrl =
        'https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&_marker=0&api_version=4&ctx=web6dot0&albumid=' +
        resolvedId;
      const dResp = await fetch(dUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', cookie: 'L=english;' }
      });
      const dData = await dResp.json();

      const tracks = (dData.list || [])
        .map((song, idx) => {
          const streamUrl = decryptSaavnUrl(
            song.more_info && song.more_info.encrypted_media_url
          );
          const duration = parseInt(
            (song.more_info && song.more_info.duration) || 0,
            10
          );
          const minutes = Math.floor(duration / 60);
          const seconds = String(duration % 60).padStart(2, '0');
          return {
            id: song.id,
            name: decodeHtml(song.title || song.song),
            artist: decodeHtml(
              (song.more_info &&
                song.more_info.artistMap &&
                song.more_info.artistMap.primary_artists &&
                song.more_info.artistMap.primary_artists[0] &&
                song.more_info.artistMap.primary_artists[0].name) ||
                song.subtitle ||
                artistName ||
                'Unknown Artist'
            ),
            album: decodeHtml(dData.title || albumName || 'Album'),
            duration: duration,
            durationStr: `${minutes}:${seconds}`,
            track: idx + 1,
            url: streamUrl,
            artwork: sanitizeArtwork(dData.image || song.image),
            isFullLength: true
          };
        })
        .filter(s => s.url && s.url.startsWith('http'));

      return res.json({
        album: decodeHtml(dData.title || albumName),
        artist: decodeHtml(dData.primary_artists || artistName),
        year: dData.year || '',
        artwork: sanitizeArtwork(dData.image),
        tracks
      });
    } catch (err) {
      console.error('Error fetching album details:', err);
      return res.status(500).json({ error: err.message, tracks: [] });
    }
  });

  // 6. Curated Hit Albums
  const FEATURED_ALBUMS = [
    { album: 'Parachutes', artist: 'Coldplay', artwork: 'https://c.saavncdn.com/254/Parachutes-English-2000-20240529104717-500x500.jpg', year: '2000' },
    { album: 'A Head Full of Dreams', artist: 'Coldplay', artwork: 'https://c.saavncdn.com/141/A-Head-Full-of-Dreams-English-2015-20201104170723-500x500.jpg', year: '2015' },
    { album: 'Ghost Stories', artist: 'Coldplay', artwork: 'https://c.saavncdn.com/284/Ghost-Stories-English-2014-20240228151342-500x500.jpg', year: '2014' },
    { album: 'Viva La Vida', artist: 'Coldplay', artwork: 'https://c.saavncdn.com/600/Viva-La-Vida-English-2008-20241016215257-500x500.jpg', year: '2008' },
    { album: 'Lover', artist: 'Taylor Swift', artwork: 'https://c.saavncdn.com/228/Lover-English-2019-20250731010741-500x500.jpg', year: '2019' },
    { album: 'folklore', artist: 'Taylor Swift', artwork: 'https://c.saavncdn.com/775/folklore-English-2020-20200724041048-500x500.jpg', year: '2020' },
    { album: 'After Hours', artist: 'The Weeknd', artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/500x500bb.jpg', year: '2020' },
    { album: 'Starboy', artist: 'The Weeknd', artwork: 'https://c.saavncdn.com/830/Starboy-English-2016-500x500.jpg', year: '2016' },
    { album: 'Divide', artist: 'Ed Sheeran', artwork: 'https://c.saavncdn.com/712/Divide-English-2017-500x500.jpg', year: '2017' },
    { album: 'Ghost', artist: 'Diljit Dosanjh', artwork: 'https://c.saavncdn.com/023/Ghost-Punjabi-2023-20230928231502-500x500.jpg', year: '2023' },
    { album: 'G.O.A.T.', artist: 'Diljit Dosanjh', artwork: 'https://c.saavncdn.com/796/G-O-A-T-Punjabi-2020-20200729185523-500x500.jpg', year: '2020' },
    { album: 'Ultimate Love Songs', artist: 'Arijit Singh', artwork: 'https://c.saavncdn.com/225/Ultimate-Love-Songs-Arijit-Singh-Hindi-2016-500x500.jpg', year: '2016' },
    { album: 'Certified Lover Boy', artist: 'Drake', artwork: 'https://c.saavncdn.com/743/Certified-Lover-Boy-English-2021-20210903113110-500x500.jpg', year: '2021' },
    { album: 'Future Nostalgia', artist: 'Dua Lipa', artwork: 'https://c.saavncdn.com/593/Future-Nostalgia-English-2020-20200327041049-500x500.jpg', year: '2020' },
    { album: 'Harmoniq Essentials', artist: 'VANSHI SAINI', artwork: 'images/default_artwork.svg', year: '2026' },
  ];

  app.get('/api/albums', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json({ albums: FEATURED_ALBUMS });
  });
};
