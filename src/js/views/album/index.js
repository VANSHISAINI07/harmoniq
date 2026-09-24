import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong, addToQueue } from '../../audio/actions';
import { fetchAlbums, fetchAlbum, addToPlaylist } from '../../api/actions';
import { pushView, pushPopup } from '../actions';
import { Button } from '../../toolbox';

const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
   display: flex;

   ${breakpointSm} {
      display: block;
   }
`;

const ArtworkContainer = styled.div`
   position: relative;
   height: 300px;
   width: 300px;
   margin-right: 32px;

   ${breakpointSm} {
      height: 36vw;
      width: 36vw;
      display: block;
      margin-right: 8px;
      max-height: 100%;
   }
`;

const Artwork = styled.img`
   border: 1px solid rgba(255, 255, 255, 0.1);
   box-sizing: border-box;
   border-radius: 8px;
   pointer-events: none;
   user-select: none;
   width: 100%;
   height: 100%;
   object-fit: cover;
   background: #282828;
   box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
`;

const Placeholder = styled.div`
   z-index: 1;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: url('images/default_artwork.svg');
   background-size: cover;
   transition: all 0.3s;
   opacity: ${props => (props.isHidden ? 0 : 1)};
`;

const ButtonContainer = styled.div`
   flex: 1;
`;

const MobileHeader = styled.div`
   position: relative;
   display: flex;
   height: 20vh;
   margin-bottom: 16px;

   @media screen and (min-width: 750px) {
      display: none;
   }
`;

const TitleContainer = styled.div`
   display: flex;
   flex-direction: column;
`;

const Title = styled.h1`
   margin: 0 0 8px;
   font-size: 32px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: -0.4px;

   ${breakpointSm} {
      font-size: 3.5vh;
   }
`;

const Subtitle = styled.h2`
   color: #1ed760;
   font-weight: 700;
   margin: 0 0 16px 0;
   font-size: 18px;

   ${breakpointSm} {
      font-size: 3vh;
   }
`;

const VisibleDesktop = styled.div`
   @media screen and (max-width: 750px) {
      display: none;
   }
`;

const PlayAllButton = styled.button`
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 24px;
   padding: 10px 24px;
   font-size: 14px;
   font-weight: 800;
   cursor: pointer;
   display: inline-flex;
   align-items: center;
   gap: 8px;
   margin-bottom: 20px;
   box-shadow: 0 4px 14px rgba(30, 215, 96, 0.4);
   transition: all 0.2s ease;

   &:hover {
      background: #1fdf64;
      transform: scale(1.03);
   }

   &:active {
      transform: scale(0.98);
   }
`;

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
      pushPopup: popup => dispatch(pushPopup(popup)),
      playSong: ({ playlist, index }) =>
         dispatch(playSong({ playlist, index })),
      addToQueue: track => dispatch(addToQueue(track)),
      addToPlaylist: (track, playlist) =>
         dispatch(addToPlaylist(track, playlist)),
      fetchAlbums: () => dispatch(fetchAlbums()),
      fetchAlbum: ({ artist, album, id }) =>
         dispatch(fetchAlbum({ artist, album, id })),
   };
};

class AlbumView extends Component {
   state = {
      isLoaded: false,
   };

   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   setupOptionsMenu = track => {
      this.props.pushPopup({
         name: 'Options',
         props: {
            options: [
               {
                  label: 'Play Next',
                  image: 'play_next.svg',
                  onClick: () => this.props.addToQueue(track),
               },
               {
                  label: 'Add to a Playlist',
                  image: 'add_to_playlist.svg',
                  onClick: () =>
                     this.props.pushPopup({
                        name: 'Playlist Selector',
                        props: {
                           onSelect: playlist =>
                              this.props.addToPlaylist(track, playlist),
                        },
                     }),
               },
            ],
         },
      });
   };

   onArtworkLoaded = () => {
      this.setState({ isLoaded: true });
   };

   onArtworkError = e => {
      if (e && e.target) {
         e.target.src = 'images/default_artwork.svg';
      }
      this.setState({ isLoaded: true });
   };

   componentDidMount() {
      const { album, artist, id, apiState } = this.props;
      const { albums, albumData } = apiState.data;

      if (albums.length === 0) {
         this.props.fetchAlbums();
      }

      if (!albumData[album] || !albumData[album].length) {
         this.props.fetchAlbum({ artist, album, id });
      }
   }

   render() {
      const { album, artist: propArtist, artwork: propArtwork, apiState, audioState } = this.props;
      const { playlist, currentIndex } = audioState;
      const { albumData } = apiState.data;
      const { isLoaded } = this.state;
      const tracks = albumData[album];
      const artwork = propArtwork || (tracks ? tracks[0] && tracks[0].artwork : null) || 'images/default_artwork.svg';
      const artist = propArtist || (tracks ? tracks[0] && tracks[0].artist : 'Artist');
      const currentTrack = playlist.length && playlist[currentIndex];
      const url = artwork && (artwork.startsWith('http') || artwork.startsWith('images'))
         ? artwork
         : 'images/default_artwork.svg';

      return (
         <Container>
            <MobileHeader>
               <ArtworkContainer>
                  <Placeholder isHidden={isLoaded} />
                  {artwork && (
                     <Artwork
                        src={url}
                        onLoad={this.onArtworkLoaded}
                        onError={this.onArtworkError}
                     />
                  )}
               </ArtworkContainer>
               <TitleContainer>
                  <Title>{album}</Title>
                  <Subtitle>{artist}</Subtitle>
               </TitleContainer>
            </MobileHeader>
            <VisibleDesktop>
               <ArtworkContainer>
                  <Placeholder isHidden={isLoaded} />
                  {artwork && (
                     <Artwork
                        src={url}
                        onLoad={this.onArtworkLoaded}
                        onError={this.onArtworkError}
                     />
                  )}
               </ArtworkContainer>
            </VisibleDesktop>
            <ButtonContainer>
               <VisibleDesktop>
                  <Title>{album}</Title>
                  <Subtitle>{artist}</Subtitle>
               </VisibleDesktop>
               {tracks && tracks.length > 0 && (
                  <PlayAllButton onClick={() => this.playSong({ playlist: tracks, index: 0 })}>
                     ▶ Play Album ({tracks.length} Songs)
                  </PlayAllButton>
               )}
               {tracks &&
                  tracks.map((item, index) => {
                     return (
                        <Button
                           key={`${item.name}-${index}`}
                           label={`${index + 1}. ${item.name}`}
                           subLabel={item.durationStr ? `${item.durationStr} • Full Song 🎵` : 'Full Song 🎵'}
                           isPlaying={
                              currentTrack &&
                              item.name === currentTrack.name &&
                              item.artist === currentTrack.artist
                           }
                           OptionsMenu={true}
                           onOptionsClick={() => this.setupOptionsMenu(item)}
                           onClick={() =>
                              this.playSong({ playlist: tracks, index })
                           }
                        />
                     );
                  })}
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(AlbumView);
