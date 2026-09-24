import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchArtists } from '../../api/actions';
import { pushView } from '../actions';
import { searchArtists } from '../../services/musicService';

const Container = styled.div`
   margin-top: 48px;
   padding-bottom: 90px;
`;

const HeaderSection = styled.div`
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

const SearchContainer = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   width: 100%;
   max-width: 600px;
`;

const SearchInput = styled.input`
   width: 100%;
   padding: 13px 20px 13px 44px;
   border-radius: 24px;
   border: 1px solid rgba(255, 255, 255, 0.15);
   background: #242424;
   color: #ffffff;
   font-size: 15px;
   outline: none;
   transition: all 0.2s ease;

   &:focus {
      border-color: #1ed760;
      background: #282828;
      box-shadow: 0 4px 16px rgba(30, 215, 96, 0.2);
   }

   &::placeholder {
      color: #727272;
   }
`;

const SearchIcon = styled.span`
   position: absolute;
   left: 16px;
   font-size: 16px;
   color: #b3b3b3;
   pointer-events: none;
`;

const GenreChips = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 8px;
   margin-top: 8px;
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
   }
`;

const ArtistGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
   gap: 24px 16px;
   margin-top: 20px;

   @media screen and (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px 12px;
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
   position: relative;
   width: 140px;
   height: 140px;
   margin-bottom: 12px;

   @media screen and (max-width: 600px) {
      width: 110px;
      height: 110px;
   }
`;

const Avatar = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 50%;
   object-fit: cover;
   background: #282828;
   border: 2px solid rgba(255, 255, 255, 0.15);
   box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
   transition: all 0.25s ease;
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

class ArtistListView extends Component {
   state = {
      searchQuery: '',
      activeGenre: 'All',
      searchResults: null,
      isSearching: false,
   };

   searchTimeout = null;

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

   componentDidMount() {
      if (!this.props.apiState.data.artists.length) {
         this.props.fetchArtists();
      }
   }

   handleSearchChange = e => {
      const query = e.target.value;
      this.setState({ searchQuery: query });

      if (this.searchTimeout) clearTimeout(this.searchTimeout);

      if (!query.trim()) {
         this.setState({ searchResults: null, isSearching: false });
         return;
      }

      this.setState({ isSearching: true });
      this.searchTimeout = setTimeout(async () => {
         try {
            const results = await searchArtists(query.trim());
            this.setState({ searchResults: results, isSearching: false });
         } catch (err) {
            console.warn('Artist search error:', err);
            this.setState({ isSearching: false });
         }
      }, 350);
   };

   render() {
      const { artists } = this.props.apiState.data;
      const { searchQuery, activeGenre, searchResults, isSearching } = this.state;

      const genres = ['All', 'Pop', 'Hip-Hop', 'Punjabi', 'Bollywood', 'Rock', 'EDM', 'R&B'];

      let displayArtists = searchResults !== null ? searchResults : artists || [];

      if (activeGenre !== 'All' && searchResults === null) {
         displayArtists = displayArtists.filter(a =>
            a.genre && a.genre.toLowerCase().includes(activeGenre.toLowerCase())
         );
      }

      return (
         <Container>
            <HeaderSection>
               <Title>Artists</Title>
               <Subtitle>
                  Explore every artist with signature profile pictures and full-length album discographies
               </Subtitle>
               <SearchContainer>
                  <SearchIcon>
                     <span role="img" aria-label="search">🔍</span>
                  </SearchIcon>
                  <SearchInput
                     type="text"
                     placeholder="Search literally any artist (e.g. Taylor Swift, Diljit, Drake, Arijit)..."
                     value={searchQuery}
                     onChange={this.handleSearchChange}
                  />
               </SearchContainer>
               <GenreChips>
                  {genres.map(genre => (
                     <Chip
                        key={genre}
                        active={activeGenre === genre}
                        onClick={() => this.setState({ activeGenre: genre, searchResults: null, searchQuery: '' })}>
                        {genre}
                     </Chip>
                  ))}
               </GenreChips>
            </HeaderSection>

            {isSearching && <p style={{ color: '#888' }}>Searching artists worldwide...</p>}

            {!isSearching && displayArtists.length === 0 && (
               <p style={{ color: '#888', marginTop: 24 }}>
                  No artists found for "{searchQuery}". Try another name or genre!
               </p>
            )}

            <ArtistGrid>
               {displayArtists.map((artistObj, index) => {
                  const name = artistObj.artist || artistObj.name;
                  const image =
                     artistObj.image ||
                     artistObj.artwork ||
                     'images/default_artwork.svg';
                  const genre = artistObj.genre || artistObj.role || 'Artist';

                  return (
                     <ArtistCard
                        key={`${name}-${index}`}
                        onClick={() => this.viewArtist(name, image)}>
                        <AvatarContainer>
                           <Avatar
                              src={image}
                              alt={name}
                              onError={e => {
                                 e.target.src = 'images/default_artwork.svg';
                              }}
                           />
                        </AvatarContainer>
                        <ArtistName>{name}</ArtistName>
                        <ArtistGenre>{genre}</ArtistGenre>
                     </ArtistCard>
                  );
               })}
            </ArtistGrid>
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      fetchArtists: () => dispatch(fetchArtists()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListView);
