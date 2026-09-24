import {
  fetchCuratedArtists,
  fetchArtistDetails,
  fetchAlbumDetails,
} from '../../../services/musicService';

const FALLBACK_ARTISTS = [
  { artist: "Coldplay" },
  { artist: "The Weeknd" },
  { artist: "VANSHI SAINI" },
];

const FALLBACK_ALBUMS = [
  { album: "Parachutes", artist: "Coldplay", artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/300x300bb.jpg" },
  { album: "After Hours", artist: "The Weeknd", artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/300x300bb.jpg" },
  { album: "Harmoniq Essentials", artist: "VANSHI SAINI", artwork: "images/default_artwork.svg" },
];

const FALLBACK_TRACKS = {
  Parachutes: [
    {
      name: "Yellow",
      artist: "Coldplay",
      album: "Parachutes",
      track: 1,
      duration: 266,
      url: "https://aac.saavncdn.com/254/6ebc38a6a7ea892f3a27cd66c71529d6_160.mp4",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/300x300bb.jpg",
    },
    {
      name: "Shiver",
      artist: "Coldplay",
      album: "Parachutes",
      track: 2,
      duration: 299,
      url: "https://aac.saavncdn.com/957/a6cdd11dba85cec1b81f45e80e5f27e5_160.mp4",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/300x300bb.jpg",
    },
  ],
  "After Hours": [
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      track: 1,
      duration: 200,
      url: "https://aac.saavncdn.com/077/0b02a92687d1ae3369b6859f44872e52_160.mp4",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/300x300bb.jpg",
    },
    {
      name: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      track: 2,
      duration: 215,
      url: "https://aac.saavncdn.com/396/8c2a3d6abc2b1133062e5082b9a00766_160.mp4",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/61/e7/3f/61e73f94-018d-5f50-50ec-8521952bc72e/20UM1IM11629.rgb.jpg/300x300bb.jpg",
    },
  ],
  "Harmoniq Essentials": [
    {
      name: "Shape of You",
      artist: "Ed Sheeran",
      album: "Harmoniq Essentials",
      track: 1,
      duration: 233,
      url: "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_160.mp4",
      artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/300x300bb.jpg",
    },
  ],
};

class ApiClass {
  fetchArtists = async () => {
    try {
      const list = await fetchCuratedArtists();
      if (list && list.length > 0) return list;
    } catch (e) {
      console.warn('Could not fetch dynamic artists, using fallback:', e);
    }
    return FALLBACK_ARTISTS;
  };

  fetchArtist = async artist => {
    try {
      const data = await fetchArtistDetails(artist);
      if (data && data.albums && data.albums.length > 0) {
        return data.albums;
      }
    } catch (e) {
      console.warn('Could not fetch artist details:', e);
    }
    return FALLBACK_ALBUMS.filter(
      a => a.artist.toLowerCase() === (artist || "").toLowerCase()
    );
  };

  fetchAlbums = async () => {
    try {
      const res = await fetch('/api/albums');
      if (res.ok) {
        const data = await res.json();
        if (data && data.albums && data.albums.length > 0) {
          return data.albums;
        }
      }
    } catch (e) {
      console.warn('Could not fetch albums from API:', e);
    }
    return FALLBACK_ALBUMS;
  };

  fetchAlbum = async ({ artist = '', album = '', id = '' }) => {
    try {
      const data = await fetchAlbumDetails({ artist, album, id });
      if (data && data.tracks && data.tracks.length > 0) {
        return data.tracks;
      }
    } catch (e) {
      console.warn('Could not fetch album details:', e);
    }
    return (
      FALLBACK_TRACKS[album] || [
        {
          name: `${album} - Full Track`,
          artist: artist || "VANSHI SAINI",
          album: album,
          track: 1,
          duration: 210,
          url: "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_160.mp4",
          artwork: "images/default_artwork.svg",
        },
      ]
    );
  };
}

const Api = new ApiClass();
export default Api;
