import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../actions';
import RecentlyPlayed from './recently_played';

const Container = styled.div`
   padding-top: 24px;
   padding-bottom: 40px;
`;

const CategoryChips = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-bottom: 24px;
   flex-wrap: wrap;
`;

const Chip = styled.button`
   padding: 8px 16px;
   border-radius: 9999px;
   background: ${props => (props.active ? '#ffffff' : '#282828')};
   color: ${props => (props.active ? '#000000' : '#ffffff')};
   font-size: 14px;
   font-weight: 700;
   border: none;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props => (props.active ? '#f0f0f0' : '#333333')};
      transform: scale(1.03);
   }

   &:active {
      transform: scale(0.97);
   }
`;

const DeveloperHero = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 22px 28px;
   background: linear-gradient(135deg, #181818 0%, #121212 100%);
   border-radius: 12px;
   margin-bottom: 32px;
   border: 1px solid rgba(30, 215, 96, 0.3);
   box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);

   @media screen and (max-width: 700px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 18px;
   }
`;

const DeveloperLeft = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

const DeveloperBadge = styled.span`
   font-size: 11px;
   font-weight: 800;
   color: #1ed760;
   letter-spacing: 1.2px;
   text-transform: uppercase;
   display: flex;
   align-items: center;
   gap: 6px;
`;

const DeveloperTitle = styled.h2`
   margin: 0;
   font-size: 24px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: -0.4px;
`;

const DeveloperDesc = styled.p`
   margin: 0;
   font-size: 13px;
   color: #b3b3b3;
`;

const ContactPills = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   flex-wrap: wrap;
`;

const PillLink = styled.a`
   display: inline-flex;
   align-items: center;
   gap: 6px;
   padding: 10px 18px;
   border-radius: 9999px;
   background: rgba(255, 255, 255, 0.1);
   color: #ffffff;
   font-size: 13px;
   font-weight: 700;
   text-decoration: none;
   border: 1px solid rgba(255, 255, 255, 0.15);
   transition: all 0.2s ease;
   cursor: pointer;

   &:hover {
      background: #1ed760;
      color: #000000;
      border-color: #1ed760;
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(30, 215, 96, 0.4);
   }
`;

const NavTilesGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
   gap: 16px;
   margin-bottom: 36px;
`;

const NavTile = styled.div`
   background: #181818;
   border-radius: 8px;
   padding: 20px;
   cursor: pointer;
   transition: all 0.2s ease;
   display: flex;
   align-items: center;
   justify-content: space-between;
   border: 1px solid rgba(255, 255, 255, 0.05);

   &:hover {
      background: #282828;
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.15);
   }
`;

const TileContent = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

const TileTitle = styled.h3`
   margin: 0;
   font-size: 16px;
   font-weight: 700;
   color: #ffffff;
`;

const TileSubtitle = styled.span`
   font-size: 12px;
   color: #b3b3b3;
`;

const TileIcon = styled.div`
   font-size: 28px;
   margin-left: 12px;
`;

const SectionHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 16px;
   margin-top: 12px;
`;

const SectionTitle = styled.h2`
   margin: 0;
   font-size: 22px;
   font-weight: 800;
   color: #ffffff;
   letter-spacing: -0.3px;
`;

const SeeAllLink = styled.button`
   background: transparent;
   border: none;
   color: #b3b3b3;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;

   &:hover {
      color: #ffffff;
      text-decoration: underline;
   }
`;

const ArtistsCarousel = styled.div`
   display: flex;
   gap: 18px;
   overflow-x: auto;
   padding-bottom: 16px;
   margin-bottom: 28px;

   &::-webkit-scrollbar {
      height: 6px;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
   }
`;

const ArtistCard = styled.div`
   min-width: 150px;
   max-width: 160px;
   background: #181818;
   border-radius: 8px;
   padding: 14px;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   cursor: pointer;
   position: relative;
   transition: all 0.25s ease;
   flex-shrink: 0;

   &:hover {
      background: #282828;
      transform: translateY(-4px);
   }
`;

const AvatarContainer = styled.div`
   position: relative;
   width: 116px;
   height: 116px;
   margin-bottom: 12px;
`;

const AvatarImg = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 50%;
   object-fit: cover;
   background: #282828;
   box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
`;

const ArtistPlayBtn = styled.div`
   position: absolute;
   right: 4px;
   bottom: 4px;
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background: #1ed760;
   color: #000000;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 16px;
   box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
   opacity: 0;
   transform: translateY(6px);
   transition: all 0.25s ease;

   ${ArtistCard}:hover & {
      opacity: 1;
      transform: translateY(0);
   }

   &:hover {
      transform: scale(1.08) !important;
      background: #1fdf64;
   }
`;

const ArtistName = styled.span`
   font-size: 14px;
   font-weight: 700;
   color: #ffffff;
   width: 100%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const ArtistRole = styled.span`
   font-size: 12px;
   color: #b3b3b3;
   margin-top: 4px;
`;

const POPULAR_ARTISTS = [
   { name: 'Coldplay', image: 'https://c.saavncdn.com/artists/Coldplay_002_20240927063715_500x500.jpg', role: 'Artist' },
   { name: 'Taylor Swift', image: 'https://c.saavncdn.com/artists/Taylor_Swift_003_20240419064047_500x500.jpg', role: 'Artist' },
   { name: 'Arijit Singh', image: 'https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_500x500.jpg', role: 'Artist' },
   { name: 'Diljit Dosanjh', image: 'https://c.saavncdn.com/artists/Diljit_Dosanjh_004_20221018184547_500x500.jpg', role: 'Artist' },
   { name: 'The Weeknd', image: 'https://c.saavncdn.com/artists/The_Weeknd_500x500.jpg', role: 'Artist' },
   { name: 'Drake', image: 'https://c.saavncdn.com/artists/Drake_500x500.jpg', role: 'Artist' },
   { name: 'Dua Lipa', image: 'https://c.saavncdn.com/artists/Dua_Lipa_005_20240503064716_500x500.jpg', role: 'Artist' },
   { name: 'Billie Eilish', image: 'https://c.saavncdn.com/artists/Billie_Eilish_003_20240517064326_500x500.jpg', role: 'Artist' },
];

class LibraryView extends Component {
   state = {
      activeChip: 'all',
   };

   changeView = (name, title, props = {}) => {
      this.props.pushView({
         name,
         title,
         props,
      });
   };

   render() {
      const { activeChip } = this.state;

      return (
         <Container>
            {/* Category Filter Chips */}
            <CategoryChips>
               <Chip
                  active={activeChip === 'all'}
                  onClick={() => this.setState({ activeChip: 'all' })}>
                  All
               </Chip>
               <Chip
                  active={activeChip === 'music'}
                  onClick={() => this.setState({ activeChip: 'music' })}>
                  Music
               </Chip>
               <Chip
                  active={activeChip === 'podcasts'}
                  onClick={() => this.setState({ activeChip: 'podcasts' })}>
                  Podcasts
               </Chip>
               <Chip
                  active={false}
                  onClick={() =>
                     this.changeView('Search', 'Artists and Songs', {
                        hideTitle: true,
                     })
                  }>
                  <span role="img" aria-label="search">🔍</span> Artists & Songs Search
               </Chip>
            </CategoryChips>

            {/* Developer Spotlight */}
            <DeveloperHero>
               <DeveloperLeft>
                  <DeveloperBadge>
                     <span role="img" aria-label="sparkles">✨</span> HARMONIQ LEAD ARCHITECT
                  </DeveloperBadge>
                  <DeveloperTitle>Developed by: VANSHI SAINI</DeveloperTitle>
                  <DeveloperDesc>
                     High-Fidelity Audio Engine, Worldwide Discographies & Synchronized Karaoke Lyrics
                  </DeveloperDesc>
               </DeveloperLeft>
               <ContactPills>
                  <PillLink
                     href="https://www.linkedin.com/in/vanshi-saini"
                     target="_blank"
                     rel="noopener noreferrer">
                     <span role="img" aria-label="briefcase">💼</span> LinkedIn
                  </PillLink>
                  <PillLink href="mailto:vanshi@harmoniq.app">
                     <span role="img" aria-label="envelope">✉️</span> Contact
                  </PillLink>
               </ContactPills>
            </DeveloperHero>

            {/* Quick Navigation Cards */}
            <NavTilesGrid>
               <NavTile
                  onClick={() =>
                     this.changeView('Search', 'Artists and Songs', {
                        hideTitle: true,
                     })
                  }>
                  <TileContent>
                     <TileTitle>Artists & Songs</TileTitle>
                     <TileSubtitle>Search millions of full tracks</TileSubtitle>
                  </TileContent>
                  <TileIcon>
                     <span role="img" aria-label="search">🔍</span>
                  </TileIcon>
               </NavTile>

               <NavTile onClick={() => this.changeView('Artists')}>
                  <TileContent>
                     <TileTitle>Artists Roster</TileTitle>
                     <TileSubtitle>60+ global icons & albums</TileSubtitle>
                  </TileContent>
                  <TileIcon>
                     <span role="img" aria-label="microphone">🎤</span>
                  </TileIcon>
               </NavTile>

               <NavTile onClick={() => this.changeView('Albums')}>
                  <TileContent>
                     <TileTitle>Studio Albums</TileTitle>
                     <TileSubtitle>Full tracklists & playback</TileSubtitle>
                  </TileContent>
                  <TileIcon>
                     <span role="img" aria-label="album">💿</span>
                  </TileIcon>
               </NavTile>

               <NavTile onClick={() => this.changeView('Playlists')}>
                  <TileContent>
                     <TileTitle>Your Playlists</TileTitle>
                     <TileSubtitle>Custom curated music</TileSubtitle>
                  </TileContent>
                  <TileIcon>
                     <span role="img" aria-label="playlist">📑</span>
                  </TileIcon>
               </NavTile>
            </NavTilesGrid>

            {/* Popular Artists Section */}
            <SectionHeader>
               <SectionTitle>Popular Artists</SectionTitle>
               <SeeAllLink onClick={() => this.changeView('Artists')}>
                  Show all
               </SeeAllLink>
            </SectionHeader>
            <ArtistsCarousel>
               {POPULAR_ARTISTS.map(artist => (
                  <ArtistCard
                     key={artist.name}
                     onClick={() =>
                        this.changeView('Artist', artist.name, {
                           artist: artist.name,
                           artistImage: artist.image,
                        })
                     }>
                     <AvatarContainer>
                        <AvatarImg
                           src={artist.image}
                           onError={e => {
                              e.target.src = 'images/default_artwork.svg';
                           }}
                           alt={artist.name}
                        />
                        <ArtistPlayBtn>▶</ArtistPlayBtn>
                     </AvatarContainer>
                     <ArtistName title={artist.name}>{artist.name}</ArtistName>
                     <ArtistRole>{artist.role}</ArtistRole>
                  </ArtistCard>
               ))}
            </ArtistsCarousel>

            {/* Recently Played / Popular Albums */}
            <RecentlyPlayed />
         </Container>
      );
   }
}

const mapStateToProps = state => ({
   viewState: state.viewState,
});

const mapDispatchToProps = dispatch => ({
   pushView: view => dispatch(pushView(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryView);
