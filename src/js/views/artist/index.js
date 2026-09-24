import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchArtist } from '../../api/actions';
import { playSong } from '../../audio/actions';
import { pushView } from '../actions';
import { AlbumButton } from '../../toolbox';
import { fetchArtistDetails } from '../../services/musicService';

const Container = styled.div`
   margin-top: 24px;
   padding-bottom: 90px;
`;

const HeroBanner = styled.div`
   display: flex;
   align-items: center;
   gap: 28px;
   padding: 24px 0;
   margin-bottom: 24px;
   border-bottom: 1px solid rgba(255, 255, 255, 0.1);

   @media screen and (max-width: 600px) {
      flex-direction: column;
      text-align: center;
      gap: 16px;
   }
`;

const ArtistAvatar = styled.img`
   width: 150px;
   height: 150px;
   border-radius: 50%;
   object-fit: cover;
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
   border: 3px solid rgba(255, 255, 255, 0.15);
   background: #282828;
`;

const ArtistMeta = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
`;

const ArtistTitle = styled.h1`
   margin: 0;
   font-size: 34px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: -0.5px;
`;

const Subtitle = styled.span`
   font-size: 14px;
   color: #b3b3b3;
   font-weight: 500;
`;

const ActionRow = styled.div`
   display: flex;
   gap: 12px;
   margin-top: 6px;

   @media screen and (max-width: 600px) {
      justify-content: center;
   }
`;

const PlayTopButton = styled.button`
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 24px;
   padding: 10px 24px;
   font-size: 14px;
   font-weight: 800;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 8px;
   box-shadow: 0 4px 14px rgba(30, 215, 96, 0.35);
   transition: all 0.2s ease;

   &:hover {
      background: #1fdf64;
      transform: scale(1.03);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const SectionTitle = styled.h2`
   margin: 28px 0 16px;
   font-size: 22px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: -0.3px;
`;

const AlbumGrid = styled.div`
   display: flex;
   flex-wrap: wrap;
   margin-top: 12px;
`;

const TopSongsList = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
   margin-bottom: 24px;
`;

const SongRow = styled.div`
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
   gap: 12px;
   min-width: 0;
`;

const SongArtwork = styled.img`
   width: 44px;
   height: 44px;
   border-radius: 6px;
   object-fit: cover;
   background: #282828;
`;

const SongInfo = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
`;

const SongTitle = styled.span`
   font-size: 15px;
   font-weight: 700;
   color: ${props => (props.isPlaying ? '#1ed760' : '#ffffff')};
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const SongAlbumName = styled.span`
   font-size: 12px;
   color: #b3b3b3;
   margin-top: 2px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const SongRight = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

const Duration = styled.span`
   font-size: 13px;
   color: #b3b3b3;
   font-variant-numeric: tabular-nums;
`;

class ArtistView extends Component {
   state = {
      artistImage: this.props.artistImage || 'images/default_artwork.svg',
      topSongs: [],
      isLoading: true,
   };

   viewAlbum = ({ artist, album, id, artwork }) => {
      this.props.pushView({
         name: 'Album',
         title: album,
         props: {
            hideTitle: true,
            artist,
            album,
            id,
            artwork,
         },
      });
   };

   async componentDidMount() {
      const { artist, apiState } = this.props;
      const { artistData } = apiState.data;

      if (!artistData[artist] || artistData[artist].length === 0) {
         this.props.fetchArtist(artist);
      }

      try {
         const details = await fetchArtistDetails(artist);
         if (details) {
            this.setState({
               artistImage: details.artistImage || this.state.artistImage,
               topSongs: details.topSongs || [],
               isLoading: false,
            });
         }
      } catch (e) {
         this.setState({ isLoading: false });
      }
   }

   handlePlayTopSongs = () => {
      const { topSongs } = this.state;
      if (topSongs.length > 0) {
         this.props.playSong({ playlist: topSongs, index: 0 });
      }
   };

   handlePlaySong = (playlist, index) => {
      this.props.playSong({ playlist, index });
   };

   render() {
      const { artist, apiState, audioState } = this.props;
      const { artistData } = apiState.data;
      const { artistImage, topSongs } = this.state;
      const albums = artistData[artist] || [];
      const currentTrack = audioState.playlist.length ? audioState.playlist[audioState.currentIndex] : null;

      return (
         <Container>
            <HeroBanner>
               <ArtistAvatar
                  src={artistImage}
                  alt={artist}
                  onError={e => {
                     e.target.src = 'images/default_artwork.svg';
                  }}
               />
               <ArtistMeta>
                  <ArtistTitle>{artist}</ArtistTitle>
                  <Subtitle>
                     {albums.length} Albums & Singles • Full-Length High Definition Audio
                  </Subtitle>
                  {topSongs.length > 0 && (
                     <ActionRow>
                        <PlayTopButton onClick={this.handlePlayTopSongs}>
                           ▶ Play Top Songs
                        </PlayTopButton>
                     </ActionRow>
                  )}
               </ArtistMeta>
            </HeroBanner>

            {topSongs.length > 0 && (
               <div>
                  <SectionTitle>Popular Tracks (Full Length)</SectionTitle>
                  <TopSongsList>
                     {topSongs.slice(0, 5).map((song, idx) => {
                        const isCurrentPlaying =
                           currentTrack &&
                           currentTrack.name === song.name &&
                           currentTrack.artist === song.artist;

                        return (
                           <SongRow
                              key={song.id || idx}
                              isPlaying={isCurrentPlaying}
                              onClick={() => this.handlePlaySong(topSongs, idx)}>
                              <SongLeft>
                                 <SongArtwork
                                    src={song.artwork}
                                    onError={e => {
                                       e.target.src = 'images/default_artwork.svg';
                                    }}
                                 />
                                 <SongInfo>
                                    <SongTitle isPlaying={isCurrentPlaying}>{song.name}</SongTitle>
                                    <SongAlbumName>{song.album}</SongAlbumName>
                                 </SongInfo>
                              </SongLeft>
                              <SongRight>
                                 <Duration>{song.durationStr}</Duration>
                                 <span style={{ color: isCurrentPlaying ? '#179b44' : '#888', fontSize: '18px' }}>
                                    {isCurrentPlaying && audioState.isPlaying ? '⏸' : '▶'}
                                 </span>
                              </SongRight>
                           </SongRow>
                        );
                     })}
                  </TopSongsList>
               </div>
            )}

            <SectionTitle>Discography & Albums ({albums.length})</SectionTitle>
            <AlbumGrid>
               {albums && albums.length > 0 ? (
                  albums.map((item, index) => {
                     const { album, artwork, id, year } = item;
                     const itemArtist = item.artist || artist;
                     const url =
                        artwork && (artwork.startsWith('http') || artwork.startsWith('images'))
                           ? artwork
                           : 'images/default_artwork.svg';

                     return (
                        <AlbumButton
                           key={`${album}-${index}`}
                           label={album}
                           sublabel={year ? `${year} • ${itemArtist}` : itemArtist}
                           artwork={url}
                           onClick={() =>
                              this.viewAlbum({
                                 artist: itemArtist,
                                 album,
                                 id,
                                 artwork: url,
                              })
                           }
                        />
                     );
                  })
               ) : (
                  <p style={{ color: '#888' }}>Loading complete discography...</p>
               )}
            </AlbumGrid>
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
      audioState: state.audioState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      fetchArtist: artist => dispatch(fetchArtist(artist)),
      playSong: ({ playlist, index }) => dispatch(playSong({ playlist, index })),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistView);
