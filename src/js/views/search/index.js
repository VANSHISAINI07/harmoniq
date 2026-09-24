import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong } from '../../audio/actions';
import { toggleLyrics } from '../../components/bar/actions';
import { pushView } from '../actions';
import {
   setSearchQuery,
   performSearch,
   setSearchTab,
} from '../../search/actions';
import { openPreferencesModal } from '../../preferences/actions';

const Container = styled.div`
   margin-top: 48px;
   padding-bottom: 90px;
`;

const SearchHeader = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 24px;
`;

const Title = styled.h1`
   margin: 0;
   font-size: 32px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
   margin: 0;
   font-size: 14px;
   color: #b3b3b3;
`;

const InputContainer = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   width: 100%;
   max-width: 640px;
`;

const SearchInput = styled.input`
   width: 100%;
   padding: 14px 44px 14px 44px;
   border-radius: 24px;
   border: 1px solid rgba(255, 255, 255, 0.15);
   background: #242424;
   color: #ffffff;
   font-size: 15px;
   outline: none;
   transition: all 0.2s ease;

   &:focus {
      border-color: #1ed760;
      background: #2a2a2a;
      box-shadow: 0 4px 16px rgba(30, 215, 96, 0.2);
   }

   &::placeholder {
      color: #727272;
   }
`;

const SearchIcon = styled.span`
   position: absolute;
   left: 16px;
   font-size: 17px;
   color: #b3b3b3;
   pointer-events: none;
`;

const ClearButton = styled.button`
   position: absolute;
   right: 14px;
   background: none;
   border: none;
   font-size: 16px;
   color: #b3b3b3;
   cursor: pointer;
   padding: 4px;
   display: flex;
   align-items: center;
   justify-content: center;

   &:hover {
      color: #ffffff;
   }
`;

const TabRow = styled.div`
   display: flex;
   gap: 10px;
   flex-wrap: wrap;
   margin-top: 4px;
`;

const TabButton = styled.button`
   padding: 8px 18px;
   border-radius: 18px;
   border: none;
   font-size: 14px;
   font-weight: 700;
   cursor: pointer;
   background: ${props => (props.active ? '#ffffff' : '#282828')};
   color: ${props => (props.active ? '#000000' : '#b3b3b3')};
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.active ? '#ffffff' : '#383838')};
      color: ${props => (props.active ? '#000000' : '#ffffff')};
   }
`;

const ChipContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 8px;
   margin-top: 6px;
`;

const Chip = styled.button`
   padding: 6px 14px;
   border-radius: 16px;
   border: 1px solid ${props => (props.active ? '#1ed760' : 'rgba(255, 255, 255, 0.15)')};
   background: ${props => (props.active ? '#1ed760' : '#242424')};
   color: ${props => (props.active ? '#000000' : '#ffffff')};
   font-size: 13px;
   font-weight: 600;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      border-color: #1ed760;
      color: ${props => (props.active ? '#000000' : '#1ed760')};
      transform: translateY(-1px);
   }

   &:active {
      transform: translateY(0);
   }
`;

const SectionHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 14px;
`;

const SectionTitle = styled.h2`
   margin: 0;
   font-size: 20px;
   font-weight: 700;
   color: #ffffff;
   display: flex;
   align-items: center;
   gap: 8px;
`;

const CountBadge = styled.span`
   font-size: 12px;
   font-weight: 600;
   color: #b3b3b3;
   background: #282828;
   padding: 2px 8px;
   border-radius: 10px;
`;

const SeeAllButton = styled.button`
   background: none;
   border: none;
   font-size: 13px;
   font-weight: 700;
   color: #1ed760;
   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
`;

/* Horizontal artist row for "All" tab */
const ArtistsRow = styled.div`
   display: flex;
   gap: 16px;
   overflow-x: auto;
   padding-bottom: 12px;
   scrollbar-width: thin;

   &::-webkit-scrollbar {
      height: 6px;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
   }
`;

const ArtistMiniCard = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   min-width: 120px;
   max-width: 130px;
   padding: 12px 8px;
   border-radius: 16px;
   background: #181818;
   border: 1px solid rgba(255, 255, 255, 0.08);
   cursor: pointer;
   transition: all 0.2s ease;
   flex-shrink: 0;

   &:hover {
      background: #282828;
      transform: translateY(-3px);
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
   }
`;

const MiniAvatar = styled.img`
   width: 84px;
   height: 84px;
   border-radius: 50%;
   object-fit: cover;
   background: #282828;
   border: 2px solid rgba(255, 255, 255, 0.1);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
   margin-bottom: 8px;
   transition: transform 0.2s ease;

   ${ArtistMiniCard}:hover & {
      transform: scale(1.05);
   }
`;

const MiniArtistName = styled.h4`
   margin: 0;
   font-size: 13px;
   font-weight: 700;
   color: #ffffff;
   width: 100%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const MiniArtistRole = styled.span`
   margin-top: 2px;
   font-size: 11px;
   color: #b3b3b3;
   width: 100%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

/* Full Grid for "Artists" tab */
const ArtistGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
   gap: 20px 16px;
   margin-top: 16px;

   @media screen and (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 14px 10px;
   }
`;

const ArtistCard = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   cursor: pointer;
   padding: 14px;
   border-radius: 8px;
   background: #181818;
   border: 1px solid rgba(255, 255, 255, 0.06);
   transition: all 0.2s ease;

   &:hover {
      background: #282828;
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
   }
`;

const AvatarContainer = styled.div`
   width: 130px;
   height: 130px;
   margin-bottom: 12px;

   @media screen and (max-width: 600px) {
      width: 100px;
      height: 100px;
   }
`;

const Avatar = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 50%;
   object-fit: cover;
   background: #282828;
   border: 2px solid rgba(255, 255, 255, 0.1);
   box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
   transition: transform 0.25s ease;

   ${ArtistCard}:hover & {
      transform: scale(1.05);
   }
`;

const ArtistName = styled.h3`
   margin: 0;
   font-size: 15px;
   font-weight: 700;
   color: #ffffff;
   max-width: 150px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const ArtistGenre = styled.span`
   margin-top: 4px;
   font-size: 12px;
   color: #b3b3b3;
   font-weight: 500;
`;

/* Song List styles */
const SongList = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
   margin-top: 10px;
`;

const SongItem = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 14px;
   border-radius: 8px;
   background: ${props => (props.isPlaying ? '#1a2e20' : '#181818')};
   border: 1px solid ${props => (props.isPlaying ? '#1ed760' : 'rgba(255, 255, 255, 0.06)')};
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.isPlaying ? '#223d2b' : '#282828')};
      transform: translateX(4px);
   }
`;

const SongLeft = styled.div`
   display: flex;
   align-items: center;
   gap: 14px;
   min-width: 0;
`;

const Artwork = styled.img`
   width: 48px;
   height: 48px;
   border-radius: 6px;
   object-fit: cover;
   background: #282828;
`;

const SongInfo = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
`;

const SongName = styled.span`
   font-size: 15px;
   font-weight: 700;
   color: ${props => (props.isPlaying ? '#1ed760' : '#ffffff')};
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const SongArtist = styled.span`
   font-size: 13px;
   color: #b3b3b3;
   margin-top: 2px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const PlayIconBadge = styled.span`
   font-size: 20px;
   color: ${props => (props.isPlaying ? '#1ed760' : '#b3b3b3')};
   padding: 8px;
`;

const Badge = styled.span`
   font-size: 10px;
   font-weight: 700;
   color: #1ed760;
   background: rgba(30, 215, 96, 0.15);
   border: 1px solid rgba(30, 215, 96, 0.3);
   padding: 2px 7px;
   border-radius: 6px;
   margin-left: 8px;
   letter-spacing: 0.5px;
   vertical-align: middle;
`;

const SongDuration = styled.span`
   font-size: 13px;
   color: #b3b3b3;
   font-variant-numeric: tabular-nums;
`;

const SongRight = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
`;

/* Local dropzone */
const DropZone = styled.div`
   border: 2px dashed rgba(255, 255, 255, 0.2);
   border-radius: 12px;
   padding: 48px 24px;
   text-align: center;
   background: #181818;
   cursor: pointer;
   transition: all 0.2s ease;
   margin-top: 16px;

   &:hover {
      border-color: #1ed760;
      background: #222222;
   }
`;

const HiddenFileInput = styled.input`
   display: none;
`;

const PreferenceSummaryCard = styled.div`
   background: linear-gradient(135deg, rgba(30, 215, 96, 0.12) 0%, rgba(20, 20, 26, 0.8) 100%);
   border: 1px solid rgba(30, 215, 96, 0.3);
   border-radius: 16px;
   padding: 24px;
   margin-bottom: 24px;
   display: flex;
   flex-direction: column;
   gap: 12px;
`;

const EditPreferencesButton = styled.button`
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 20px;
   padding: 8px 18px;
   font-size: 13px;
   font-weight: 800;
   cursor: pointer;
   white-space: nowrap;
   transition: all 0.2s ease;

   &:hover {
      background: #1fdf64;
      transform: scale(1.04);
   }
`;

const PrefGenreBadge = styled.span`
   background: rgba(255, 255, 255, 0.08);
   border: 1px solid rgba(255, 255, 255, 0.15);
   border-radius: 16px;
   padding: 5px 12px;
   font-size: 12px;
   font-weight: 600;
   color: #ffffff;
   cursor: pointer;
   transition: all 0.15s ease;

   &:hover {
      background: #1ed760;
      color: #000000;
      border-color: #1ed760;
   }
`;

const SUGGESTIONS = [
   'Top Hits',
   'Coldplay',
   'Taylor Swift',
   'The Weeknd',
   'Diljit Dosanjh',
   'Drake',
   'Arijit Singh',
   'Ed Sheeran',
   'Dua Lipa',
   'Billie Eilish',
];

class SearchView extends Component {
   state = {
      localTracks: [],
   };

   fileInputRef = React.createRef();
   searchTimeout = null;

   componentDidMount() {
      const { searchState, initialQuery } = this.props;
      const initQ = initialQuery || (searchState && searchState.query);
      if (initQ && initQ.trim()) {
         this.props.setSearchQuery(initQ.trim());
         this.props.performSearch(initQ.trim());
      } else if (!searchState || !searchState.songResults || !searchState.songResults.length) {
         this.props.performSearch('');
      }
   }

   componentDidUpdate(prevProps) {
      const nextInit = this.props.initialQuery;
      if (nextInit && nextInit !== prevProps.initialQuery) {
         this.props.setSearchQuery(nextInit);
         this.props.performSearch(nextInit);
      }
   }

   viewArtist = (artist, image) => {
      this.props.pushView({
         name: 'Artist',
         title: artist,
         props: {
            artist,
            artistImage: image,
         },
      });
   };

   handleChipClick = term => {
      this.props.setSearchQuery(term);
      this.props.performSearch(term);
   };

   handleSearchChange = e => {
      const query = e.target.value;
      this.props.setSearchQuery(query);

      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
         this.props.performSearch(query.trim());
      }, 250);
   };

   handleClearSearch = () => {
      this.props.setSearchQuery('');
      this.props.performSearch('');
   };

   handlePlaySong = (playlist, index) => {
      this.props.playSong({ playlist, index });
   };

   handleLocalFilesSelected = e => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      const newTracks = files.map((file, idx) => {
         const baseName = file.name.replace(/\.[^/.]+$/, '');
         const parts = baseName.split(' - ');
         let artist = 'Local Artist';
         let name = baseName;

         if (parts.length >= 2) {
            artist = parts[0].trim();
            name = parts.slice(1).join(' - ').trim();
         }

         return {
            name,
            artist,
            album: 'My Local Music',
            track: idx + 1,
            url: URL.createObjectURL(file),
            artwork: 'images/default_artwork.svg',
            isFullLength: true,
         };
      });

      const updated = [...this.state.localTracks, ...newTracks];
      this.setState({ localTracks: updated });

      if (newTracks.length > 0) {
         this.props.playSong({
            playlist: updated,
            index: this.state.localTracks.length,
         });
      }
   };

   renderSongItem = (song, idx, list) => {
      const { audioState } = this.props;
      const { playlist, currentIndex, isPlaying } = audioState;
      const currentTrack = playlist.length ? playlist[currentIndex] : null;

      const isCurrentPlaying =
         currentTrack &&
         currentTrack.name === song.name &&
         currentTrack.artist === song.artist;

      return (
         <SongItem
            key={song.id || `${song.name}-${idx}`}
            isPlaying={isCurrentPlaying}
            onClick={() => this.handlePlaySong(list, idx)}>
            <SongLeft>
               <Artwork
                  src={song.artwork}
                  onError={e => {
                     e.target.src = 'images/default_artwork.svg';
                  }}
                  alt={song.name}
               />
               <SongInfo>
                  <SongName isPlaying={isCurrentPlaying}>
                     {song.name}
                     {song.isFullLength && (
                        <Badge>
                           FULL SONG <span role="img" aria-label="music">🎵</span>
                        </Badge>
                     )}
                  </SongName>
                  <SongArtist>
                     {song.artist} — {song.album}
                  </SongArtist>
               </SongInfo>
            </SongLeft>
            <SongRight>
               {song.durationStr && <SongDuration>{song.durationStr}</SongDuration>}
               <PlayIconBadge isPlaying={isCurrentPlaying}>
                  {isCurrentPlaying && isPlaying ? '⏸' : '▶'}
               </PlayIconBadge>
            </SongRight>
         </SongItem>
      );
   };

   render() {
      const searchState = this.props.searchState || {};
      const preferencesState = this.props.preferencesState || {};
      const userPreferences = preferencesState.preferences || {};
      const activeTab = searchState.activeTab || 'all';
      const searchQuery = searchState.query !== undefined ? searchState.query : '';
      const songResults = searchState.songResults || [];
      const artistResults = searchState.artistResults || [];
      const isLoading = !!searchState.isLoading;
      const { localTracks } = this.state;

      const hasArtists = artistResults.length > 0;
      const hasSongs = songResults.length > 0;

      return (
         <Container>
            <SearchHeader>
               <Title>Artists and Songs</Title>
               <Subtitle>
                  Search and explore artists worldwide, stream full-length songs with synchronized lyrics, or play your local MP3s!
               </Subtitle>

               <TabRow>
                  <TabButton
                     active={activeTab === 'all'}
                     onClick={() => this.props.setSearchTab('all')}>
                     All Results <span role="img" aria-label="sparkles">✨</span>
                  </TabButton>
                  <TabButton
                     active={activeTab === 'artists'}
                     onClick={() => this.props.setSearchTab('artists')}>
                     Artists ({artistResults.length}) <span role="img" aria-label="microphone">🎤</span>
                  </TabButton>
                  <TabButton
                     active={activeTab === 'songs'}
                     onClick={() => this.props.setSearchTab('songs')}>
                     Songs ({songResults.length}) <span role="img" aria-label="music">🎵</span>
                  </TabButton>
                  <TabButton
                     active={activeTab === 'preferences'}
                     onClick={() => this.props.setSearchTab('preferences')}>
                     My Preferences <span role="img" aria-label="gear">⚙️</span>
                  </TabButton>
                  <TabButton
                     active={activeTab === 'local'}
                     onClick={() => this.props.setSearchTab('local')}>
                     Local MP3s <span role="img" aria-label="folder">📁</span>
                  </TabButton>
               </TabRow>

               {activeTab !== 'local' && activeTab !== 'preferences' && (
                  <React.Fragment>
                     <InputContainer>
                        <SearchIcon>
                           <span role="img" aria-label="search">🔍</span>
                        </SearchIcon>
                        <SearchInput
                           type="text"
                           placeholder="Search any artist or song (e.g. Coldplay, Taylor Swift, Diljit, Yellow)..."
                           value={searchQuery}
                           onChange={this.handleSearchChange}
                           autoFocus
                        />
                        {searchQuery && (
                           <ClearButton onClick={this.handleClearSearch}>✕</ClearButton>
                        )}
                     </InputContainer>
                     <ChipContainer>
                        {SUGGESTIONS.map(chip => (
                           <Chip
                              key={chip}
                              active={searchQuery === chip}
                              onClick={() => this.handleChipClick(chip)}>
                              {chip}
                           </Chip>
                        ))}
                     </ChipContainer>
                  </React.Fragment>
               )}
            </SearchHeader>

            {isLoading && (
               <p style={{ color: '#888', margin: '20px 0' }}>
                  Searching artists & full songs with real studio vocals...
               </p>
            )}

            {/* TAB 1: ALL RESULTS */}
            {activeTab === 'all' && (
               <div>
                  {!isLoading && !hasArtists && !hasSongs && searchQuery && (
                     <p style={{ color: '#888' }}>
                        No results found for "{searchQuery}". Try another artist or song name!
                     </p>
                  )}

                  {/* Artists Section in All tab */}
                  {hasArtists && (
                     <div style={{ marginBottom: '32px' }}>
                        <SectionHeader>
                           <SectionTitle>
                              Artists <CountBadge>{artistResults.length}</CountBadge>
                           </SectionTitle>
                           {artistResults.length > 6 && (
                              <SeeAllButton
                                 onClick={() => this.props.setSearchTab('artists')}>
                                 See all ({artistResults.length}) →
                              </SeeAllButton>
                           )}
                        </SectionHeader>
                        <ArtistsRow>
                           {artistResults.slice(0, 10).map((artist, idx) => {
                              const artistName =
                                 artist.name || artist.artist || 'Unknown Artist';
                              return (
                                 <ArtistMiniCard
                                    key={artist.id || idx}
                                    onClick={() =>
                                       this.viewArtist(artistName, artist.image)
                                    }>
                                    <MiniAvatar
                                       src={artist.image}
                                       onError={e => {
                                          e.target.src = 'images/default_artwork.svg';
                                       }}
                                       alt={artistName}
                                    />
                                    <MiniArtistName title={artistName}>
                                       {artistName}
                                    </MiniArtistName>
                                    <MiniArtistRole>
                                       {artist.role || artist.genre || 'Artist'}
                                    </MiniArtistRole>
                                 </ArtistMiniCard>
                              );
                           })}
                        </ArtistsRow>
                     </div>
                  )}

                  {/* Songs Section in All tab */}
                  {hasSongs && (
                     <div>
                        <SectionHeader>
                           <SectionTitle>
                              Songs <CountBadge>{songResults.length}</CountBadge>
                           </SectionTitle>
                           {songResults.length > 10 && (
                              <SeeAllButton
                                 onClick={() => this.props.setSearchTab('songs')}>
                                 See all ({songResults.length}) →
                              </SeeAllButton>
                           )}
                        </SectionHeader>
                        <SongList>
                           {songResults.map((song, idx) =>
                              this.renderSongItem(song, idx, songResults)
                           )}
                        </SongList>
                     </div>
                  )}
               </div>
            )}

            {/* TAB 2: ARTISTS ONLY */}
            {activeTab === 'artists' && (
               <div>
                  {!isLoading && !hasArtists && (
                     <p style={{ color: '#888' }}>No artists found.</p>
                  )}
                  <ArtistGrid>
                     {artistResults.map((artist, idx) => {
                        const artistName =
                           artist.name || artist.artist || 'Unknown Artist';
                        return (
                           <ArtistCard
                              key={artist.id || idx}
                              onClick={() =>
                                 this.viewArtist(artistName, artist.image)
                              }>
                              <AvatarContainer>
                                 <Avatar
                                    src={artist.image}
                                    onError={e => {
                                       e.target.src = 'images/default_artwork.svg';
                                    }}
                                    alt={artistName}
                                 />
                              </AvatarContainer>
                              <ArtistName title={artistName}>
                                 {artistName}
                              </ArtistName>
                              <ArtistGenre>
                                 {artist.role || artist.genre || 'Artist'}
                              </ArtistGenre>
                           </ArtistCard>
                        );
                     })}
                  </ArtistGrid>
               </div>
            )}

            {/* TAB 3: SONGS ONLY */}
            {activeTab === 'songs' && (
               <div>
                  {!isLoading && !hasSongs && (
                     <p style={{ color: '#888' }}>No songs found.</p>
                  )}
                  <SongList>
                     {songResults.map((song, idx) =>
                        this.renderSongItem(song, idx, songResults)
                     )}
                  </SongList>
               </div>
            )}

            {/* TAB 4: LOCAL MP3s */}
            {activeTab === 'local' && (
               <div>
                  <DropZone
                     onClick={() =>
                        this.fileInputRef.current &&
                        this.fileInputRef.current.click()
                     }>
                     <p style={{ fontSize: '40px', margin: '0 0 12px' }}>
                        <span role="img" aria-label="music">🎵</span>
                     </p>
                     <h3 style={{ margin: '0 0 6px', color: '#111' }}>
                        Click to Select MP3 / Audio Files
                     </h3>
                     <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>
                        Supports MP3, M4A, FLAC, and WAV. Full-length playback with automatic synchronized lyrics!
                     </p>
                     <HiddenFileInput
                        ref={this.fileInputRef}
                        type="file"
                        multiple
                        accept="audio/*"
                        onChange={this.handleLocalFilesSelected}
                     />
                  </DropZone>

                  {localTracks.length > 0 && (
                     <SongList>
                        <h3 style={{ margin: '16px 0 8px', fontSize: '18px' }}>
                           Your Imported Songs ({localTracks.length})
                        </h3>
                        {localTracks.map((song, idx) => {
                           const { audioState } = this.props;
                           const { playlist, currentIndex, isPlaying } = audioState;
                           const currentTrack = playlist.length ? playlist[currentIndex] : null;
                           const isCurrentPlaying =
                              currentTrack &&
                              currentTrack.name === song.name &&
                              currentTrack.artist === song.artist;

                           return (
                              <SongItem
                                 key={idx}
                                 isPlaying={isCurrentPlaying}
                                 onClick={() =>
                                    this.handlePlaySong(localTracks, idx)
                                 }>
                                 <SongLeft>
                                    <Artwork src="images/default_artwork.svg" />
                                    <SongInfo>
                                       <SongName isPlaying={isCurrentPlaying}>
                                          {song.name}
                                          <Badge>
                                             LOCAL MP3 <span role="img" aria-label="folder">📁</span>
                                          </Badge>
                                       </SongName>
                                       <SongArtist>{song.artist}</SongArtist>
                                    </SongInfo>
                                 </SongLeft>
                                 <SongRight>
                                    <PlayIconBadge isPlaying={isCurrentPlaying}>
                                       {isCurrentPlaying && isPlaying ? '⏸' : '▶'}
                                    </PlayIconBadge>
                                 </SongRight>
                              </SongItem>
                           );
                        })}
                     </SongList>
                  )}
               </div>
            )}

            {/* TAB 5: MY PREFERENCES */}
            {activeTab === 'preferences' && (
               <div>
                  <PreferenceSummaryCard>
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'flex-start',
                           gap: '16px',
                           flexWrap: 'wrap',
                        }}>
                        <div style={{ flex: 1, minWidth: '260px' }}>
                           <span
                              style={{
                                 fontSize: '11px',
                                 fontWeight: 800,
                                 color: '#1ed760',
                                 textTransform: 'uppercase',
                                 letterSpacing: '1px',
                              }}>
                              Architect Profile & Taste
                           </span>
                           <h2
                              style={{
                                 margin: '4px 0 10px 0',
                                 fontSize: '20px',
                                 fontWeight: 800,
                                 color: '#ffffff',
                              }}>
                              <span role="img" aria-label="pencil">✍️</span> Your Written Music Preference
                           </h2>
                           <p
                              style={{
                                 margin: 0,
                                 fontSize: '15px',
                                 lineHeight: 1.6,
                                 color: '#e4e4e7',
                                 fontStyle: 'italic',
                              }}>
                              "{userPreferences.musicTasteBio ||
                                 'No custom preference written yet. Click the button to express your music taste, favorite vibes, and artists!'}"
                           </p>
                        </div>
                        <EditPreferencesButton
                           onClick={this.props.openPreferencesModal}
                           title="Open preferences modal to write and customize">
                           <span role="img" aria-label="pencil">✍️</span> Write & Edit Preferences
                        </EditPreferencesButton>
                     </div>

                     <div
                        style={{
                           marginTop: '16px',
                           display: 'flex',
                           flexWrap: 'wrap',
                           gap: '8px',
                           alignItems: 'center',
                        }}>
                        <span
                           style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#1ed760',
                           }}>
                           Favorite Genres:
                        </span>
                        {(userPreferences.favoriteGenres || []).map((g, idx) => (
                           <PrefGenreBadge
                              key={idx}
                              onClick={() => this.handleChipClick(g)}>
                              {g}
                           </PrefGenreBadge>
                        ))}
                     </div>

                     <div
                        style={{
                           marginTop: '10px',
                           display: 'flex',
                           flexWrap: 'wrap',
                           gap: '8px',
                           alignItems: 'center',
                        }}>
                        <span
                           style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#1ed760',
                           }}>
                           Preferred Artists:
                        </span>
                        {(userPreferences.favoriteArtists || []).map((a, idx) => (
                           <PrefGenreBadge
                              key={idx}
                              onClick={() => this.handleChipClick(a)}>
                              <span role="img" aria-label="microphone">🎤</span> {a}
                           </PrefGenreBadge>
                        ))}
                     </div>

                     <div
                        style={{
                           marginTop: '10px',
                           display: 'flex',
                           flexWrap: 'wrap',
                           gap: '12px',
                           fontSize: '12px',
                           color: '#a1a1aa',
                        }}>
                        <span>
                           Streaming Engine:{' '}
                           <strong style={{ color: '#1ed760' }}>
                              {userPreferences.audioQuality || '320kbps Lossless'}
                           </strong>
                        </span>
                        <span>•</span>
                        <span>
                           Languages:{' '}
                           <strong style={{ color: '#ffffff' }}>
                              {(userPreferences.languages || []).join(', ')}
                           </strong>
                        </span>
                     </div>
                  </PreferenceSummaryCard>

                  <SectionHeader>
                     <SectionTitle>
                        Songs Recommended for Your Taste{' '}
                        <CountBadge>{songResults.length}</CountBadge>
                     </SectionTitle>
                  </SectionHeader>
                  <SongList>
                     {songResults.map((song, idx) =>
                        this.renderSongItem(song, idx, songResults)
                     )}
                  </SongList>
               </div>
            )}
         </Container>
      );
   }
}

const mapStateToProps = state => ({
   audioState: state.audioState,
   searchState: state.searchState,
   preferencesState: state.preferencesState,
});

const mapDispatchToProps = dispatch => ({
   playSong: ({ playlist, index }) => dispatch(playSong({ playlist, index })),
   toggleLyrics: show => dispatch(toggleLyrics(show)),
   pushView: view => dispatch(pushView(view)),
   setSearchQuery: query => dispatch(setSearchQuery(query)),
   performSearch: query => dispatch(performSearch(query)),
   setSearchTab: tab => dispatch(setSearchTab(tab)),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
