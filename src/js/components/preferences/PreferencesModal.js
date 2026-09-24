/**
 * HARMONIQ MUSIC PREFERENCES & SETTINGS MODAL
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 * Digital Signature: 0x56414E534849-5341494E49-PREFERENCES-2026
 * Full interactive panel to write and configure music preferences,
 * favorite artists, genres, languages, and streaming quality.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
   closePreferencesModal,
   updatePreferences,
   resetPreferences,
} from '../../preferences/actions';
import { performSearch, setSearchQuery, setSearchTab } from '../../search/actions';
import { pushView } from '../../views/actions';

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.82);
   backdrop-filter: blur(12px);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 10002;
   padding: 16px;
   animation: fadeIn 0.2s ease-out;

   @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
   }
`;

const ModalCard = styled.div`
   width: 100%;
   max-width: 680px;
   max-height: 88vh;
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#141418')};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   border-radius: 20px;
   box-shadow: 0 32px 64px rgba(0, 0, 0, 0.85);
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.12)'
            : 'rgba(255, 255, 255, 0.12)'};
   position: relative;
   display: flex;
   flex-direction: column;
   overflow: hidden;
   animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);

   @keyframes slideUp {
      from {
         opacity: 0;
         transform: translateY(24px) scale(0.97);
      }
      to {
         opacity: 1;
         transform: translateY(0) scale(1);
      }
   }
`;

const ModalHeader = styled.div`
   padding: 24px 28px 18px;
   border-bottom: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
   gap: 16px;
`;

const HeaderTitleGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

const HeaderTitle = styled.h2`
   margin: 0;
   font-size: 22px;
   font-weight: 800;
   display: flex;
   align-items: center;
   gap: 10px;
   letter-spacing: -0.3px;
`;

const HeaderSubtitle = styled.p`
   margin: 0;
   font-size: 13px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#a0a0ab')};
   line-height: 1.4;
`;

const CloseButton = styled.button`
   background: transparent;
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#b3b3b3')};
   font-size: 20px;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 36px;
   height: 36px;
   border-radius: 50%;
   transition: all 0.2s ease;

   &:hover {
      background: ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.06)'
            : 'rgba(255, 255, 255, 0.1)'};
      color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   }
`;

const ScrollableBody = styled.div`
   flex: 1;
   overflow-y: auto;
   padding: 24px 28px;
   display: flex;
   flex-direction: column;
   gap: 26px;

   &::-webkit-scrollbar {
      width: 8px;
   }

   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
   }
`;

const Section = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

const SectionLabel = styled.label`
   font-size: 14px;
   font-weight: 700;
   display: flex;
   align-items: center;
   gap: 8px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const SectionDesc = styled.p`
   margin: -4px 0 6px 0;
   font-size: 12px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#8e8e99')};
   line-height: 1.4;
`;

const BioTextArea = styled.textarea`
   width: 100%;
   min-height: 110px;
   padding: 14px 16px;
   background: ${props => (props.themeMode === 'light' ? '#f4f5f7' : '#1e1e24')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.15)'
            : 'rgba(255, 255, 255, 0.14)'};
   border-radius: 12px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   font-size: 14px;
   line-height: 1.5;
   outline: none;
   resize: vertical;
   box-sizing: border-box;
   font-family: inherit;
   transition: all 0.2s ease;

   &:focus {
      border-color: #1ed760;
      box-shadow: 0 0 0 2px rgba(30, 215, 96, 0.25);
      background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#25252d')};
   }

   &::placeholder {
      color: ${props => (props.themeMode === 'light' ? '#9ca3af' : '#71717a')};
   }
`;

const VibeChipsRow = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 8px;
   margin-top: 4px;
`;

const VibeChip = styled.button`
   background: ${props =>
      props.active
         ? '#1ed760'
         : props.themeMode === 'light'
            ? '#f0f2f5'
            : 'rgba(255, 255, 255, 0.08)'};
   color: ${props =>
      props.active
         ? '#000000'
         : props.themeMode === 'light'
            ? '#374151'
            : '#e5e7eb'};
   border: 1px solid
      ${props =>
         props.active
            ? '#1ed760'
            : props.themeMode === 'light'
               ? 'rgba(0, 0, 0, 0.08)'
               : 'rgba(255, 255, 255, 0.1)'};
   border-radius: 20px;
   padding: 6px 12px;
   font-size: 12px;
   font-weight: 600;
   cursor: pointer;
   display: inline-flex;
   align-items: center;
   gap: 6px;
   transition: all 0.18s ease;

   &:hover {
      background: ${props =>
         props.active
            ? '#1fdf64'
            : props.themeMode === 'light'
               ? '#e5e7eb'
               : 'rgba(255, 255, 255, 0.16)'};
      transform: translateY(-1px);
   }
`;

const TagsContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 8px;
   margin-bottom: 8px;
`;

const TagBadge = styled.span`
   display: inline-flex;
   align-items: center;
   gap: 6px;
   padding: 6px 12px;
   background: rgba(30, 215, 96, 0.14);
   border: 1px solid rgba(30, 215, 96, 0.35);
   border-radius: 20px;
   color: #1ed760;
   font-size: 13px;
   font-weight: 700;
`;

const TagRemove = styled.button`
   background: none;
   border: none;
   color: #1ed760;
   cursor: pointer;
   font-size: 13px;
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   opacity: 0.75;

   &:hover {
      opacity: 1;
      color: #ff5252;
   }
`;

const InlineAddRow = styled.div`
   display: flex;
   gap: 8px;
   align-items: center;
`;

const InlineInput = styled.input`
   flex: 1;
   padding: 10px 14px;
   background: ${props => (props.themeMode === 'light' ? '#f4f5f7' : '#1e1e24')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.15)'
            : 'rgba(255, 255, 255, 0.14)'};
   border-radius: 10px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   font-size: 13px;
   outline: none;

   &:focus {
      border-color: #1ed760;
   }

   &::placeholder {
      color: ${props => (props.themeMode === 'light' ? '#9ca3af' : '#71717a')};
   }
`;

const AddButton = styled.button`
   padding: 10px 16px;
   background: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   color: ${props => (props.themeMode === 'light' ? '#ffffff' : '#000000')};
   border: none;
   border-radius: 10px;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s ease;
   white-space: nowrap;

   &:hover {
      background: #1ed760;
      color: #000000;
   }
`;

const QualityOptionGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
   gap: 10px;
`;

const QualityCard = styled.div`
   padding: 14px 16px;
   background: ${props =>
      props.selected
         ? 'rgba(30, 215, 96, 0.12)'
         : props.themeMode === 'light'
            ? '#f8f9fa'
            : '#1c1c22'};
   border: 1.5px solid
      ${props =>
         props.selected
            ? '#1ed760'
            : props.themeMode === 'light'
               ? 'rgba(0, 0, 0, 0.08)'
               : 'rgba(255, 255, 255, 0.08)'};
   border-radius: 12px;
   cursor: pointer;
   display: flex;
   flex-direction: column;
   gap: 4px;
   transition: all 0.2s ease;

   &:hover {
      border-color: #1ed760;
      transform: translateY(-2px);
   }
`;

const QualityTitle = styled.span`
   font-size: 14px;
   font-weight: 700;
   color: ${props => (props.selected ? '#1ed760' : 'inherit')};
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const QualityDesc = styled.span`
   font-size: 11px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#888892')};
`;

const ToggleRow = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 12px 16px;
   background: ${props => (props.themeMode === 'light' ? '#f8f9fa' : '#1c1c22')};
   border-radius: 12px;
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.06)'
            : 'rgba(255, 255, 255, 0.06)'};
`;

const ToggleLabelGroup = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2px;
`;

const ToggleTitle = styled.span`
   font-size: 13px;
   font-weight: 700;
`;

const ToggleSub = styled.span`
   font-size: 11px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#888892')};
`;

const ToggleSwitch = styled.button`
   width: 44px;
   height: 24px;
   border-radius: 12px;
   background: ${props => (props.checked ? '#1ed760' : '#4b5563')};
   border: none;
   position: relative;
   cursor: pointer;
   transition: background 0.2s ease;

   &::after {
      content: '';
      position: absolute;
      top: 3px;
      left: ${props => (props.checked ? '23px' : '3px')};
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #ffffff;
      transition: left 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
   }
`;

const SuccessAlert = styled.div`
   padding: 12px 18px;
   background: rgba(30, 215, 96, 0.15);
   border: 1px solid #1ed760;
   border-radius: 12px;
   color: #1ed760;
   font-size: 13px;
   font-weight: 700;
   display: flex;
   align-items: center;
   gap: 10px;
   animation: fadeIn 0.25s ease-out;
`;

const ModalFooter = styled.div`
   padding: 18px 28px;
   border-top: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 12px;
   background: ${props => (props.themeMode === 'light' ? '#fafafa' : '#121215')};
`;

const ResetButton = styled.button`
   background: transparent;
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#888892')};
   font-size: 13px;
   font-weight: 600;
   cursor: pointer;
   padding: 8px 12px;
   border-radius: 8px;
   transition: all 0.2s ease;

   &:hover {
      color: #ff5252;
      background: rgba(255, 82, 82, 0.1);
   }
`;

const ActionButtonGroup = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
`;

const CancelButton = styled.button`
   padding: 10px 18px;
   background: transparent;
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.15)'
            : 'rgba(255, 255, 255, 0.15)'};
   border-radius: 24px;
   color: inherit;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.08)'};
   }
`;

const SaveButton = styled.button`
   padding: 10px 24px;
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 24px;
   font-size: 14px;
   font-weight: 800;
   cursor: pointer;
   transition: all 0.2s ease;
   display: flex;
   align-items: center;
   gap: 8px;

   &:hover {
      background: #1fdf64;
      transform: scale(1.03);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const SUGGESTED_GENRES = [
   'Punjabi Hip-Hop',
   'Bollywood',
   'Pop',
   'Indie Rock',
   'Sufi & Ghazal',
   'Lo-Fi & Chill',
   'EDM & Club',
   'Acoustic',
   'R&B / Soul',
   'Classic Rock',
];

const SUGGESTED_ARTISTS = [
   'Cheema Y',
   'Diljit Dosanjh',
   'Sidhu Moose Wala',
   'Karan Aujla',
   'Arijit Singh',
   'Coldplay',
   'The Weeknd',
   'Taylor Swift',
   'AP Dhillon',
   'Shubh',
];

const VIBE_PROMPTS = [
   '🔥 Punjabi Drill & High Energy',
   '💖 Soulful Bollywood Romance',
   '🌙 Late Night Acoustic Drive',
   '☕ Chill Lo-Fi Study Beats',
   '⚡ Gym Workout Pump',
   '🎸 90s Nostalgic Rock',
];

class PreferencesModal extends Component {
   constructor(props) {
      super(props);
      const prefs = (props.preferencesState && props.preferencesState.preferences) || {};
      this.state = {
         musicTasteBio: prefs.musicTasteBio || '',
         favoriteGenres: prefs.favoriteGenres || [],
         favoriteArtists: prefs.favoriteArtists || [],
         languages: prefs.languages || ['Punjabi', 'Hindi', 'English'],
         audioQuality: prefs.audioQuality || '320kbps',
         autoplaySimilar: prefs.autoplaySimilar !== false,
         normalizeVolume: prefs.normalizeVolume !== false,
         smoothMix: prefs.smoothMix !== false,
         crossfadeSeconds: typeof prefs.crossfadeSeconds === 'number' ? prefs.crossfadeSeconds : 4,
         newArtistInput: '',
         newGenreInput: '',
         showSavedNotice: false,
      };
   }

   componentDidUpdate(prevProps) {
      if (
         prevProps.preferencesState.preferences !==
         this.props.preferencesState.preferences
      ) {
         const prefs = this.props.preferencesState.preferences || {};
         this.setState({
            musicTasteBio: prefs.musicTasteBio || '',
            favoriteGenres: prefs.favoriteGenres || [],
            favoriteArtists: prefs.favoriteArtists || [],
            languages: prefs.languages || ['Punjabi', 'Hindi', 'English'],
            audioQuality: prefs.audioQuality || '320kbps',
            autoplaySimilar: prefs.autoplaySimilar !== false,
            normalizeVolume: prefs.normalizeVolume !== false,
            smoothMix: prefs.smoothMix !== false,
            crossfadeSeconds: typeof prefs.crossfadeSeconds === 'number' ? prefs.crossfadeSeconds : 4,
         });
      }
   }

   handleAppendVibe = prompt => {
      const { musicTasteBio } = this.state;
      const clean = prompt.replace(/^[^a-zA-Z0-9]+/, '');
      const separator = musicTasteBio && !musicTasteBio.endsWith(' ') ? ', ' : '';
      this.setState({
         musicTasteBio: `${musicTasteBio}${separator}${clean}`,
      });
   };

   handleAddArtist = name => {
      const target = (name || this.state.newArtistInput).trim();
      if (!target) return;
      if (!this.state.favoriteArtists.includes(target)) {
         this.setState(prev => ({
            favoriteArtists: [...prev.favoriteArtists, target],
            newArtistInput: '',
         }));
      } else {
         this.setState({ newArtistInput: '' });
      }
   };

   handleRemoveArtist = artistName => {
      this.setState(prev => ({
         favoriteArtists: prev.favoriteArtists.filter(a => a !== artistName),
      }));
   };

   handleToggleGenre = genre => {
      this.setState(prev => {
         const exists = prev.favoriteGenres.includes(genre);
         return {
            favoriteGenres: exists
               ? prev.favoriteGenres.filter(g => g !== genre)
               : [...prev.favoriteGenres, genre],
         };
      });
   };

   handleAddCustomGenre = () => {
      const g = this.state.newGenreInput.trim();
      if (g && !this.state.favoriteGenres.includes(g)) {
         this.setState(prev => ({
            favoriteGenres: [...prev.favoriteGenres, g],
            newGenreInput: '',
         }));
      }
   };

   handleToggleLanguage = lang => {
      this.setState(prev => {
         const exists = prev.languages.includes(lang);
         return {
            languages: exists
               ? prev.languages.filter(l => l !== lang)
               : [...prev.languages, lang],
         };
      });
   };

   handleSave = () => {
      const payload = {
         musicTasteBio: this.state.musicTasteBio,
         favoriteGenres: this.state.favoriteGenres,
         favoriteArtists: this.state.favoriteArtists,
         languages: this.state.languages,
         audioQuality: this.state.audioQuality,
         autoplaySimilar: this.state.autoplaySimilar,
         normalizeVolume: this.state.normalizeVolume,
         smoothMix: this.state.smoothMix,
         crossfadeSeconds: this.state.crossfadeSeconds,
      };

      this.props.updatePreferences(payload);
      this.setState({ showSavedNotice: true });

      // Automatically personalize search recommendations
      const primaryArtist =
         this.state.favoriteArtists[0] ||
         this.state.favoriteGenres[0] ||
         'Top Hits';

      setTimeout(() => {
         this.props.performSearch(primaryArtist);
         this.setState({ showSavedNotice: false });
         this.props.closePreferencesModal();
      }, 900);
   };

   handleReset = () => {
      if (window.confirm('Reset all music preferences to default settings?')) {
         this.props.resetPreferences();
      }
   };

   render() {
      const { preferencesState, themeState, closePreferencesModal } = this.props;
      if (!preferencesState || !preferencesState.isPreferencesModalOpen) return null;

      const themeMode = (themeState && themeState.theme) || 'dark';
      const {
         musicTasteBio,
         favoriteGenres,
         favoriteArtists,
         languages,
         audioQuality,
         autoplaySimilar,
         normalizeVolume,
         smoothMix,
         crossfadeSeconds,
         newArtistInput,
         newGenreInput,
         showSavedNotice,
      } = this.state;

      return (
         <ModalBackdrop onClick={closePreferencesModal}>
            <ModalCard themeMode={themeMode} onClick={e => e.stopPropagation()}>
               <ModalHeader themeMode={themeMode}>
                  <HeaderTitleGroup>
                     <HeaderTitle>
                        <span role="img" aria-label="gear">⚙️</span> Music Preferences & Taste
                     </HeaderTitle>
                     <HeaderSubtitle themeMode={themeMode}>
                        Write your music preferences, favorite artists, genres, and audio settings.
                        Configured for Lead Architect <strong>VANSHI SAINI</strong>.
                     </HeaderSubtitle>
                  </HeaderTitleGroup>
                  <CloseButton themeMode={themeMode} onClick={closePreferencesModal}>
                     ✕
                  </CloseButton>
               </ModalHeader>

               <ScrollableBody>
                  {showSavedNotice && (
                     <SuccessAlert>
                        <span role="img" aria-label="check">✔</span>
                        Preferences successfully saved! Harmoniq is now tailored to your taste.
                     </SuccessAlert>
                  )}

                  {/* 1. WRITE YOUR MUSIC PREFERENCE & BIO */}
                  <Section>
                     <SectionLabel themeMode={themeMode}>
                        <span role="img" aria-label="pencil">✍️</span> Write Your Music Preference & Taste
                     </SectionLabel>
                     <SectionDesc themeMode={themeMode}>
                        Describe your musical taste in your own words. Write the vibes, genres, tempos,
                        and artists you love listening to.
                     </SectionDesc>
                     <BioTextArea
                        themeMode={themeMode}
                        placeholder="Write your music preferences here... e.g. I love high-tempo Punjabi drill songs for workouts, soulful Bollywood romantic melodies in the evening, and relaxing Coldplay or Lo-Fi acoustic classics for late nights..."
                        value={musicTasteBio}
                        onChange={e => this.setState({ musicTasteBio: e.target.value })}
                        autoFocus
                     />
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#8e8e99' }}>
                           Click a vibe to append:
                        </span>
                        <span style={{ fontSize: '11px', color: '#8e8e99' }}>
                           {musicTasteBio.length} characters
                        </span>
                     </div>
                     <VibeChipsRow>
                        {VIBE_PROMPTS.map((prompt, idx) => (
                           <VibeChip
                              key={idx}
                              themeMode={themeMode}
                              onClick={() => this.handleAppendVibe(prompt)}>
                              {prompt}
                           </VibeChip>
                        ))}
                     </VibeChipsRow>
                  </Section>

                  {/* 2. FAVORITE ARTISTS */}
                  <Section>
                     <SectionLabel themeMode={themeMode}>
                        <span role="img" aria-label="mic">🎤</span> Your Preferred Artists ({favoriteArtists.length})
                     </SectionLabel>
                     <SectionDesc themeMode={themeMode}>
                        Add or write the names of artists whose music you want Harmoniq to prioritize.
                     </SectionDesc>

                     {favoriteArtists.length > 0 && (
                        <TagsContainer>
                           {favoriteArtists.map((artist, idx) => (
                              <TagBadge key={idx}>
                                 {artist}
                                 <TagRemove
                                    onClick={() => this.handleRemoveArtist(artist)}
                                    title={`Remove ${artist}`}>
                                    ✕
                                 </TagRemove>
                              </TagBadge>
                           ))}
                        </TagsContainer>
                     )}

                     <InlineAddRow>
                        <InlineInput
                           themeMode={themeMode}
                           type="text"
                           placeholder="Write & add an artist (e.g. Cheema Y, Karan Aujla, Drake)..."
                           value={newArtistInput}
                           onChange={e => this.setState({ newArtistInput: e.target.value })}
                           onKeyDown={e => e.key === 'Enter' && this.handleAddArtist()}
                        />
                        <AddButton
                           themeMode={themeMode}
                           onClick={() => this.handleAddArtist()}>
                           ＋ Add Artist
                        </AddButton>
                     </InlineAddRow>

                     <div style={{ marginTop: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#8e8e99' }}>Quick suggestions: </span>
                        <VibeChipsRow style={{ marginTop: '4px' }}>
                           {SUGGESTED_ARTISTS.map((artist, idx) => {
                              const isAdded = favoriteArtists.includes(artist);
                              return (
                                 <VibeChip
                                    key={idx}
                                    active={isAdded}
                                    themeMode={themeMode}
                                    onClick={() =>
                                       isAdded
                                          ? this.handleRemoveArtist(artist)
                                          : this.handleAddArtist(artist)
                                    }>
                                    {isAdded ? `✔ ${artist}` : `＋ ${artist}`}
                                 </VibeChip>
                              );
                           })}
                        </VibeChipsRow>
                     </div>
                  </Section>

                  {/* 3. FAVORITE GENRES */}
                  <Section>
                     <SectionLabel themeMode={themeMode}>
                        <span role="img" aria-label="guitar">🎸</span> Preferred Genres & Styles
                     </SectionLabel>
                     <SectionDesc themeMode={themeMode}>
                        Select your favorite genres or write a custom style to customize your discovery feed.
                     </SectionDesc>
                     <VibeChipsRow>
                        {SUGGESTED_GENRES.map((genre, idx) => {
                           const active = favoriteGenres.includes(genre);
                           return (
                              <VibeChip
                                 key={idx}
                                 active={active}
                                 themeMode={themeMode}
                                 onClick={() => this.handleToggleGenre(genre)}>
                                 {active ? `✔ ${genre}` : genre}
                              </VibeChip>
                           );
                        })}
                     </VibeChipsRow>
                     <InlineAddRow style={{ marginTop: '8px' }}>
                        <InlineInput
                           themeMode={themeMode}
                           type="text"
                           placeholder="Write a custom genre (e.g. Sufi Rock, Kawali, Synthwave)..."
                           value={newGenreInput}
                           onChange={e => this.setState({ newGenreInput: e.target.value })}
                           onKeyDown={e => e.key === 'Enter' && this.handleAddCustomGenre()}
                        />
                        <AddButton
                           themeMode={themeMode}
                           onClick={this.handleAddCustomGenre}>
                           ＋ Add Genre
                        </AddButton>
                     </InlineAddRow>
                  </Section>

                  {/* 4. LANGUAGES */}
                  <Section>
                     <SectionLabel themeMode={themeMode}>
                        <span role="img" aria-label="globe">🌐</span> Preferred Music & Lyrics Languages
                     </SectionLabel>
                     <SectionDesc themeMode={themeMode}>
                        Choose the languages you prefer for song recommendations and synchronized lyrics.
                     </SectionDesc>
                     <VibeChipsRow>
                        {[
                           { key: 'Punjabi', label: '🌾 Punjabi (ਪੰਜਾਬੀ)' },
                           { key: 'Hindi', label: '🇮🇳 Hindi (हिंदी)' },
                           { key: 'English', label: '🇬🇧 English' },
                           { key: 'Spanish', label: '💃 Spanish' },
                           { key: 'Korean', label: '🌸 Korean (K-Pop)' },
                        ].map(item => {
                           const active = languages.includes(item.key);
                           return (
                              <VibeChip
                                 key={item.key}
                                 active={active}
                                 themeMode={themeMode}
                                 onClick={() => this.handleToggleLanguage(item.key)}>
                                 {active ? `✔ ${item.label}` : item.label}
                              </VibeChip>
                           );
                        })}
                     </VibeChipsRow>
                  </Section>

                  {/* 5. SOUND ENGINE & STREAMING QUALITY */}
                  <Section>
                     <SectionLabel themeMode={themeMode}>
                        <span role="img" aria-label="headphones">🎧</span> Audio Quality & Streaming Engine
                     </SectionLabel>
                     <SectionDesc themeMode={themeMode}>
                        Select your preferred bit-depth and streaming fidelity.
                     </SectionDesc>
                     <QualityOptionGrid>
                        <QualityCard
                           selected={audioQuality === '320kbps'}
                           themeMode={themeMode}
                           onClick={() => this.setState({ audioQuality: '320kbps' })}>
                           <QualityTitle selected={audioQuality === '320kbps'}>
                              320 kbps Extreme {audioQuality === '320kbps' ? '✔' : ''}
                           </QualityTitle>
                           <QualityDesc themeMode={themeMode}>
                              Lossless Studio Master • Ultra High Definition Audio
                           </QualityDesc>
                        </QualityCard>

                        <QualityCard
                           selected={audioQuality === '256kbps'}
                           themeMode={themeMode}
                           onClick={() => this.setState({ audioQuality: '256kbps' })}>
                           <QualityTitle selected={audioQuality === '256kbps'}>
                              256 kbps High {audioQuality === '256kbps' ? '✔' : ''}
                           </QualityTitle>
                           <QualityDesc themeMode={themeMode}>
                              Crisp CD Fidelity • Balanced Data Usage
                           </QualityDesc>
                        </QualityCard>

                        <QualityCard
                           selected={audioQuality === '160kbps'}
                           themeMode={themeMode}
                           onClick={() => this.setState({ audioQuality: '160kbps' })}>
                           <QualityTitle selected={audioQuality === '160kbps'}>
                              160 kbps Standard {audioQuality === '160kbps' ? '✔' : ''}
                           </QualityTitle>
                           <QualityDesc themeMode={themeMode}>
                              Data Saver • Fast loading on mobile networks
                           </QualityDesc>
                        </QualityCard>
                     </QualityOptionGrid>

                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                        <ToggleRow themeMode={themeMode}>
                           <ToggleLabelGroup>
                              <ToggleTitle>Autoplay Music Based on Written Preferences</ToggleTitle>
                              <ToggleSub themeMode={themeMode}>
                                 Keep the music going with similar artists and genres you love
                              </ToggleSub>
                           </ToggleLabelGroup>
                           <ToggleSwitch
                              checked={autoplaySimilar}
                              onClick={() =>
                                 this.setState(prev => ({ autoplaySimilar: !prev.autoplaySimilar }))
                              }
                           />
                        </ToggleRow>

                        <ToggleRow themeMode={themeMode}>
                           <ToggleLabelGroup>
                              <ToggleTitle>Normalize Volume Level</ToggleTitle>
                              <ToggleSub themeMode={themeMode}>
                                 Set the same volume level for all tracks automatically
                              </ToggleSub>
                           </ToggleLabelGroup>
                           <ToggleSwitch
                              checked={normalizeVolume}
                              onClick={() =>
                                 this.setState(prev => ({ normalizeVolume: !prev.normalizeVolume }))
                              }
                           />
                        </ToggleRow>

                        <ToggleRow themeMode={themeMode}>
                           <ToggleLabelGroup>
                              <ToggleTitle>
                                 <span role="img" aria-label="sparkles">✨</span> Smooth Mix & Crossfade (Apple Music Style)
                              </ToggleTitle>
                              <ToggleSub themeMode={themeMode}>
                                 Seamlessly blends the ending of a song into the next track with no gap or silence
                              </ToggleSub>
                           </ToggleLabelGroup>
                           <ToggleSwitch
                              checked={smoothMix}
                              onClick={() =>
                                 this.setState(prev => ({ smoothMix: !prev.smoothMix }))
                              }
                           />
                        </ToggleRow>

                        {smoothMix && (
                           <div style={{
                              padding: '12px 14px',
                              background: themeMode === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.04)',
                              borderRadius: '12px',
                              border: `1px solid ${themeMode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)'}`,
                              marginTop: '2px',
                           }}>
                              <div style={{
                                 fontSize: '12px',
                                 fontWeight: '700',
                                 color: themeMode === 'light' ? '#374151' : '#d1d5db',
                                 marginBottom: '10px',
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center',
                              }}>
                                 <span>DJ Blend Overlap Duration:</span>
                                 <span style={{ color: '#1ed760', fontWeight: '800' }}>{crossfadeSeconds} Seconds</span>
                              </div>
                              <VibeChipsRow>
                                 {[
                                    { sec: 2, label: '2s Quick' },
                                    { sec: 4, label: '4s Standard (Recommended)' },
                                    { sec: 6, label: '6s DJ Blend' },
                                    { sec: 8, label: '8s Extended' },
                                    { sec: 12, label: '12s Club Automix' },
                                 ].map(item => (
                                    <VibeChip
                                       key={item.sec}
                                       active={crossfadeSeconds === item.sec}
                                       themeMode={themeMode}
                                       onClick={() => this.setState({ crossfadeSeconds: item.sec })}>
                                       {crossfadeSeconds === item.sec ? `✔ ${item.label}` : item.label}
                                    </VibeChip>
                                 ))}
                              </VibeChipsRow>
                           </div>
                        )}
                     </div>
                  </Section>
               </ScrollableBody>

               <ModalFooter themeMode={themeMode}>
                  <ResetButton onClick={this.handleReset} title="Reset to default preferences">
                     Reset to Default
                  </ResetButton>
                  <ActionButtonGroup>
                     <CancelButton themeMode={themeMode} onClick={closePreferencesModal}>
                        Cancel
                     </CancelButton>
                     <SaveButton onClick={this.handleSave}>
                        <span>Save & Apply Preferences</span>
                        <span role="img" aria-label="sparkles">✨</span>
                     </SaveButton>
                  </ActionButtonGroup>
               </ModalFooter>
            </ModalCard>
         </ModalBackdrop>
      );
   }
}

const mapStateToProps = state => ({
   preferencesState: state.preferencesState,
   themeState: state.themeState,
});

const mapDispatchToProps = dispatch => ({
   closePreferencesModal: () => dispatch(closePreferencesModal()),
   updatePreferences: prefs => dispatch(updatePreferences(prefs)),
   resetPreferences: () => dispatch(resetPreferences()),
   performSearch: query => dispatch(performSearch(query)),
   setSearchQuery: query => dispatch(setSearchQuery(query)),
   setSearchTab: tab => dispatch(setSearchTab(tab)),
   pushView: view => dispatch(pushView(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesModal);
