import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { toggleLyrics } from '../bar/actions';
import { resume, pause, nextSong, prevSong, updateTime } from '../../audio/actions';
import { fetchLyrics, saveCustomLyrics, getTrackKey, parseLrc } from '../../services/lyricsService';
import { SUPPORTED_LYRICS_LANGUAGES } from '../../services/lyricsTranslationService';
import { formatTime } from '../bar/components/controls/scrubber';

const fadeIn = keyframes`
   from { opacity: 0; transform: translateY(20px); }
   to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
   0%, 100% { opacity: 0.3; }
   50% { opacity: 0.8; }
`;

const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 200;
   background: radial-gradient(circle at 50% 20%, #1f2735 0%, #0a0c10 100%);
   color: #fff;
   display: flex;
   flex-direction: column;
   animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
   overflow: hidden;
   user-select: none;
`;

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-wrap: wrap;
   gap: 12px;
   padding: 24px 32px 16px;
   background: linear-gradient(180deg, rgba(10, 12, 16, 0.9) 0%, rgba(10, 12, 16, 0) 100%);
   z-index: 10;

   @media screen and (max-width: 600px) {
      padding: 16px 20px 12px;
   }
`;

const TrackDetails = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;
   min-width: 0;
`;

const ArtworkThumb = styled.img`
   width: 48px;
   height: 48px;
   border-radius: 8px;
   object-fit: cover;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
   background: #232730;

   @media screen and (max-width: 600px) {
      width: 40px;
      height: 40px;
   }
`;

const TrackMeta = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
`;

const TrackTitle = styled.h2`
   margin: 0;
   font-size: 18px;
   font-weight: 700;
   color: #ffffff;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   @media screen and (max-width: 600px) {
      font-size: 16px;
   }
`;

const TrackArtist = styled.p`
   margin: 4px 0 0;
   font-size: 14px;
   color: rgba(255, 255, 255, 0.65);
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const HeaderActions = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
`;

const SyncBadge = styled.span`
   font-size: 11px;
   font-weight: 700;
   text-transform: uppercase;
   letter-spacing: 0.8px;
   padding: 4px 10px;
   border-radius: 12px;
   background: ${props => (props.isSynced ? 'rgba(29, 185, 84, 0.25)' : 'rgba(255, 255, 255, 0.15)')};
   color: ${props => (props.isSynced ? '#1ed760' : 'rgba(255, 255, 255, 0.7)')};
   border: 1px solid ${props => (props.isSynced ? 'rgba(29, 185, 84, 0.4)' : 'transparent')};

   @media screen and (max-width: 600px) {
      display: none;
   }
`;

const LanguageTabs = styled.div`
   display: flex;
   align-items: center;
   background: rgba(255, 255, 255, 0.08);
   border-radius: 20px;
   padding: 3px;
   gap: 4px;
   border: 1px solid rgba(255, 255, 255, 0.12);

   @media screen and (max-width: 760px) {
      order: 3;
      width: 100%;
      justify-content: center;
      margin-top: 4px;
   }
`;

const LangTab = styled.button`
   background: ${props => (props.isActive ? '#1ed760' : 'transparent')};
   color: ${props => (props.isActive ? '#000000' : 'rgba(255, 255, 255, 0.75)')};
   border: none;
   border-radius: 16px;
   padding: 6px 14px;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 6px;
   transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
   white-space: nowrap;

   &:hover {
      color: ${props => (props.isActive ? '#000000' : '#ffffff')};
      background: ${props => (props.isActive ? '#1ed760' : 'rgba(255, 255, 255, 0.12)')};
   }

   @media screen and (max-width: 600px) {
      padding: 5px 10px;
      font-size: 11px;
   }
`;

const IconButton = styled.button`
   background: rgba(255, 255, 255, 0.1);
   border: none;
   color: #fff;
   width: 40px;
   height: 40px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   font-size: 18px;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
   }

   &:active {
      transform: scale(0.95);
   }
`;

const ScrollContainer = styled.div`
   flex: 1;
   overflow-y: auto;
   padding: 25vh 40px 30vh 40px;
   scroll-behavior: smooth;

   &::-webkit-scrollbar {
      width: 6px;
   }
   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
   }

   @media screen and (max-width: 750px) {
      padding: 15vh 24px 28vh 24px;
   }
`;

const LyricLine = styled.div`
   font-size: ${props => (props.isActive ? '34px' : '28px')};
   font-weight: ${props => (props.isActive ? '800' : '700')};
   line-height: 1.45;
   margin: 20px 0;
   color: ${props =>
      props.isActive
         ? '#ffffff'
         : props.isPast
            ? 'rgba(255, 255, 255, 0.45)'
            : 'rgba(255, 255, 255, 0.28)'};
   cursor: pointer;
   transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
   transform-origin: left center;
   transform: ${props => (props.isActive ? 'scale(1.03)' : 'scale(1)')};
   text-shadow: ${props =>
      props.isActive ? '0 0 20px rgba(255, 255, 255, 0.45)' : 'none'};

   &:hover {
      color: rgba(255, 255, 255, 0.85);
   }

   @media screen and (max-width: 750px) {
      font-size: ${props => (props.isActive ? '26px' : '21px')};
      margin: 16px 0;
   }
`;

const PlainLyricsText = styled.div`
   font-size: 24px;
   line-height: 1.8;
   color: rgba(255, 255, 255, 0.85);
   white-space: pre-wrap;
   max-width: 650px;
   margin: 0 auto;

   @media screen and (max-width: 750px) {
      font-size: 18px;
   }
`;

const EmptyState = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100%;
   text-align: center;
   padding: 0 20px;
`;

const EmptyIcon = styled.div`
   font-size: 56px;
   margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
   font-size: 24px;
   font-weight: 700;
   margin: 0 0 8px;
`;

const EmptySubtitle = styled.p`
   font-size: 15px;
   color: rgba(255, 255, 255, 0.6);
   max-width: 400px;
   margin: 0 0 24px;
`;

const ActionButton = styled.button`
   padding: 12px 24px;
   background: #1ed760;
   color: #000;
   border: none;
   border-radius: 24px;
   font-size: 14px;
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: #22e66b;
      transform: scale(1.04);
   }

   &:active {
      transform: scale(0.96);
   }
`;

const SecondaryButton = styled(ActionButton)`
   background: rgba(255, 255, 255, 0.15);
   color: #fff;
   margin-left: 12px;

   &:hover {
      background: rgba(255, 255, 255, 0.25);
   }
`;

const LoadingBar = styled.div`
   height: 28px;
   width: ${props => props.width || '60%'};
   background: rgba(255, 255, 255, 0.15);
   border-radius: 6px;
   margin: 20px 0;
   animation: ${pulse} 1.5s infinite ease-in-out;
`;

// Bottom mini-player bar
const BottomBar = styled.div`
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   padding: 20px 32px 28px;
   background: linear-gradient(0deg, rgba(10, 12, 16, 0.95) 0%, rgba(10, 12, 16, 0.7) 70%, rgba(10, 12, 16, 0) 100%);
   display: flex;
   flex-direction: column;
   gap: 12px;
   z-index: 10;

   @media screen and (max-width: 600px) {
      padding: 14px 20px 20px;
   }
`;

const ProgressRow = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   width: 100%;
   max-width: 800px;
   margin: 0 auto;
`;

const TimeLabel = styled.span`
   font-size: 12px;
   color: rgba(255, 255, 255, 0.6);
   width: 42px;
   text-align: center;
`;

const ProgressBar = styled.div`
   flex: 1;
   height: 6px;
   background: rgba(255, 255, 255, 0.2);
   border-radius: 3px;
   cursor: pointer;
   position: relative;
   display: flex;
   align-items: center;

   &:hover div {
      background: #1ed760;
   }
`;

const ProgressFill = styled.div`
   height: 100%;
   width: ${props => props.percent || 0}%;
   background: #ffffff;
   border-radius: 3px;
   position: relative;
`;

const ProgressThumb = styled.div`
   position: absolute;
   right: -8px;
   top: -5px;
   width: 16px;
   height: 16px;
   background: #ffffff;
   border-radius: 50%;
   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
   cursor: grab;
   transition: transform 0.1s ease;

   &:active {
      cursor: grabbing;
      transform: scale(1.3);
   }
`;

const ControlsRow = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 24px;
`;

const PlayButton = styled.button`
   width: 52px;
   height: 52px;
   border-radius: 50%;
   background: #ffffff;
   color: #000000;
   border: none;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   font-size: 22px;
   transition: all 0.2s ease;

   &:hover {
      transform: scale(1.08);
      background: #1ed760;
   }

   &:active {
      transform: scale(0.95);
   }
`;

const SkipButton = styled.button`
   background: none;
   border: none;
   color: rgba(255, 255, 255, 0.8);
   font-size: 22px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      color: #ffffff;
      transform: scale(1.1);
   }
`;

// Modal for editing/pasting custom lyrics
const ModalOverlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.8);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 300;
   padding: 20px;
`;

const ModalContent = styled.div`
   background: #181c24;
   border-radius: 16px;
   width: 100%;
   max-width: 550px;
   padding: 28px;
   display: flex;
   flex-direction: column;
   gap: 16px;
   box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
   border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h3`
   margin: 0;
   font-size: 20px;
   color: #fff;
`;

const TextArea = styled.textarea`
   width: 100%;
   height: 220px;
   background: #0e1117;
   border: 1px solid rgba(255, 255, 255, 0.15);
   border-radius: 8px;
   color: #fff;
   padding: 12px;
   font-family: monospace;
   font-size: 13px;
   resize: vertical;
   box-sizing: border-box;

   &:focus {
      outline: none;
      border-color: #1ed760;
   }
`;

const ModalButtons = styled.div`
   display: flex;
   justify-content: flex-end;
   gap: 12px;
`;

class LyricsView extends Component {
   state = {
      isLoading: true,
      lyricsData: null,
      activeLineIndex: -1,
      isEditModalOpen: false,
      editText: '',
      isUserScrolling: false,
      currentLang: (typeof localStorage !== 'undefined' && localStorage.getItem('harmoniq_lyrics_lang')) || 'en',
   };

   lineRefs = [];
   scrollTimeout = null;
   lastTrackKey = null;
   progressBarRef = React.createRef();
   isProgressDragging = false;

   componentDidMount() {
      this.loadLyricsForCurrentTrack();
   }

   componentDidUpdate(prevProps) {
      const currentTrack = this.getCurrentTrack();
      const prevTrack = this.getCurrentTrack(prevProps);

      const currentKey = currentTrack ? getTrackKey(currentTrack.artist, currentTrack.name) : null;
      const prevKey = prevTrack ? getTrackKey(prevTrack.artist, prevTrack.name) : null;

      if (currentKey !== prevKey) {
         this.loadLyricsForCurrentTrack();
      } else if (this.props.audioState.time.current !== prevProps.audioState.time.current) {
         this.updateActiveLine();
      }
   }

   componentWillUnmount() {
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      window.removeEventListener('mousemove', this.handleProgressMouseMove);
      window.removeEventListener('mouseup', this.handleProgressMouseUp);
   }

   getCurrentTrack = (props = this.props) => {
      const { audioState } = props;
      const { queue, inQueue, playlist, currentIndex } = audioState;
      if (queue.length && inQueue) return queue[0];
      if (playlist && playlist.length && currentIndex < playlist.length) {
         return playlist[currentIndex];
      }
      return {
         name: 'Harmoniq',
         artist: 'VANSHI SAINI',
         album: 'Harmoniq App',
         artwork: 'images/default_artwork.svg',
      };
   };

   loadLyricsForCurrentTrack = async () => {
      const track = this.getCurrentTrack();
      if (!track) return;

      this.setState({ isLoading: true });

      const duration = track.duration || this.props.audioState.time.max || 0;
      const result = await fetchLyrics({
         artist: track.artist,
         title: track.name,
         album: track.album,
         duration,
         lang: this.state.currentLang,
      });

      this.setState({
         isLoading: false,
         lyricsData: result,
         activeLineIndex: -1,
      });

      this.updateActiveLine();
   };

   handleLanguageChange = langCode => {
      if (langCode === this.state.currentLang) return;
      try {
         localStorage.setItem('harmoniq_lyrics_lang', langCode);
      } catch (e) {
         // ignore
      }
      this.setState({ currentLang: langCode }, () => {
         this.loadLyricsForCurrentTrack();
      });
   };

   updateActiveLine = () => {
      const { lyricsData } = this.state;
      if (!lyricsData || !lyricsData.isSynced || !lyricsData.lines.length) return;

      const currentTime = this.props.audioState.time.current || 0;
      const lines = lyricsData.lines;

      let activeIndex = -1;
      for (let i = 0; i < lines.length; i++) {
         if (currentTime >= lines[i].time) {
            activeIndex = i;
         } else {
            break;
         }
      }

      if (activeIndex !== this.state.activeLineIndex) {
         this.setState({ activeLineIndex: activeIndex }, () => {
            if (!this.state.isUserScrolling && activeIndex >= 0) {
               this.scrollToActiveLine(activeIndex);
            }
         });
      }
   };

   scrollToActiveLine = index => {
      const el = this.lineRefs[index];
      if (el) {
         el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   };

   handleUserScroll = () => {
      this.setState({ isUserScrolling: true });
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
         this.setState({ isUserScrolling: false });
      }, 3000);
   };

   handleLineClick = time => {
      const audio = document.getElementById('audio');
      if (audio) {
         audio.currentTime = time;
         if (audio.paused) {
            audio.play();
            this.props.resume();
         }
      }
      this.props.updateTime({
         current: time,
         max: (this.props.audioState.time && this.props.audioState.time.max) || 0,
      });
      this.setState({ isUserScrolling: false }, () => {
         this.updateActiveLine();
      });
   };

   handleProgressMouseDown = e => {
      this.isProgressDragging = true;
      this.handleSeekByEvent(e);
      window.addEventListener('mousemove', this.handleProgressMouseMove);
      window.addEventListener('mouseup', this.handleProgressMouseUp);
   };

   handleProgressMouseMove = e => {
      if (!this.isProgressDragging) return;
      this.handleSeekByEvent(e);
   };

   handleProgressMouseUp = () => {
      this.isProgressDragging = false;
      window.removeEventListener('mousemove', this.handleProgressMouseMove);
      window.removeEventListener('mouseup', this.handleProgressMouseUp);
   };

   handleSeekByEvent = e => {
      if (!this.progressBarRef.current) return;
      const rect = this.progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, clickX / rect.width));
      const max = (this.props.audioState.time && this.props.audioState.time.max) || 1;
      const newTime = percent * max;

      const audio = document.getElementById('audio');
      if (audio) {
         audio.currentTime = newTime;
      }
      this.props.updateTime({ current: newTime, max });
      this.setState({ isUserScrolling: false }, () => {
         this.updateActiveLine();
      });
   };

   handleProgressBarClick = e => {
      this.handleSeekByEvent(e);
   };

   openEditModal = () => {
      const { lyricsData } = this.state;
      this.setState({
         isEditModalOpen: true,
         editText: lyricsData ? lyricsData.raw || '' : '',
      });
   };

   closeEditModal = () => {
      this.setState({ isEditModalOpen: false });
   };

   handleSaveCustomLyrics = () => {
      const track = this.getCurrentTrack();
      const trackKey = getTrackKey(track.artist, track.name);
      const { currentLang, editText } = this.state;
      saveCustomLyrics(trackKey, editText, currentLang);

      const parsed = parseLrc(editText);
      const isSynced = parsed.length > 0;

      this.setState({
         isEditModalOpen: false,
         lyricsData: {
            isSynced,
            lines: parsed,
            plainText: editText,
            raw: editText,
            source: 'custom',
            lang: currentLang,
         },
      });
   };

   render() {
      const { navState, audioState } = this.props;
      if (!navState.showLyrics) return null;

      const { isLoading, lyricsData, activeLineIndex, isEditModalOpen, editText, currentLang } = this.state;
      const track = this.getCurrentTrack();
      const { isPlaying, time } = audioState;
      const current = time.current || 0;
      const max = time.max || 0;
      const progressPercent = max > 0 ? (current / max) * 100 : 0;

      const artworkSrc = track.artwork && track.artwork.startsWith('http')
         ? track.artwork
         : track.artwork && !track.artwork.startsWith('images')
            ? `https://tannerv.ddns.net/SpotiFree/${track.artwork}`
            : 'images/default_artwork.svg';

      return (
         <Overlay>
            <Header>
               <TrackDetails>
                  <ArtworkThumb
                     src={artworkSrc}
                     onError={e => {
                        e.target.src = 'images/default_artwork.svg';
                     }}
                  />
                  <TrackMeta>
                     <TrackTitle>{track.name}</TrackTitle>
                     <TrackArtist>{track.artist}</TrackArtist>
                  </TrackMeta>
                  {lyricsData && (
                     <SyncBadge isSynced={lyricsData.isSynced}>
                        {lyricsData.isSynced ? '● Synced' : 'Plain Text'}
                     </SyncBadge>
                  )}
               </TrackDetails>

               <LanguageTabs role="tablist" aria-label="Lyrics Language">
                  {SUPPORTED_LYRICS_LANGUAGES.map(lang => (
                     <LangTab
                        key={lang.code}
                        role="tab"
                        aria-selected={currentLang === lang.code}
                        isActive={currentLang === lang.code}
                        onClick={() => this.handleLanguageChange(lang.code)}
                        title={`Lyrics in ${lang.label} (${lang.native})`}>
                        <span role="img" aria-label={lang.label}>
                           {lang.flag}
                        </span>
                        <span>{lang.native}</span>
                     </LangTab>
                  ))}
               </LanguageTabs>

               <HeaderActions>
                  <IconButton
                     title="Add or Edit Lyrics"
                     onClick={this.openEditModal}>
                     <span role="img" aria-label="edit">✏️</span>
                  </IconButton>
                  <IconButton
                     title="Close Lyrics"
                     onClick={() => this.props.toggleLyrics(false)}>
                     ✕
                  </IconButton>
               </HeaderActions>
            </Header>

            <ScrollContainer onScroll={this.handleUserScroll}>
               {isLoading ? (
                  <EmptyState>
                     <LoadingBar width="45%" />
                     <LoadingBar width="70%" />
                     <LoadingBar width="60%" />
                     <LoadingBar width="50%" />
                     <LoadingBar width="65%" />
                  </EmptyState>
               ) : !lyricsData ? (
                  <EmptyState>
                     <EmptyIcon>
                        <span role="img" aria-label="microphone">🎤</span>
                     </EmptyIcon>
                     <EmptyTitle>No Lyrics Found</EmptyTitle>
                     <EmptySubtitle>
                        We couldn't locate synchronized lyrics for "{track.name}".
                        You can paste your own lyrics or timestamps below!
                     </EmptySubtitle>
                     <div>
                        <ActionButton onClick={this.loadLyricsForCurrentTrack}>
                           Search Online
                        </ActionButton>
                        <SecondaryButton onClick={this.openEditModal}>
                           Add Custom Lyrics
                        </SecondaryButton>
                     </div>
                  </EmptyState>
               ) : lyricsData.isSynced ? (
                  <div>
                     {lyricsData.lines.map((line, idx) => {
                        const isActive = idx === activeLineIndex;
                        const isPast = idx < activeLineIndex;
                        return (
                           <LyricLine
                              key={idx}
                              ref={el => (this.lineRefs[idx] = el)}
                              isActive={isActive}
                              isPast={isPast}
                              onClick={() => this.handleLineClick(line.time)}>
                              {line.text}
                           </LyricLine>
                        );
                     })}
                  </div>
               ) : (
                  <PlainLyricsText>{lyricsData.plainText}</PlainLyricsText>
               )}
            </ScrollContainer>

            <BottomBar>
               <ProgressRow>
                  <TimeLabel>{formatTime(current)}</TimeLabel>
                  <ProgressBar
                     ref={this.progressBarRef}
                     onMouseDown={this.handleProgressMouseDown}
                     onClick={this.handleProgressBarClick}>
                     <ProgressFill percent={progressPercent}>
                        <ProgressThumb />
                     </ProgressFill>
                  </ProgressBar>
                  <TimeLabel>{max > 0 ? formatTime(max) : '--:--'}</TimeLabel>
               </ProgressRow>
               <ControlsRow>
                  <SkipButton onClick={this.props.prevSong} title="Previous">
                     ⏮
                  </SkipButton>
                  <PlayButton
                     onClick={() => (isPlaying ? this.props.pause() : this.props.resume())}
                     title={isPlaying ? 'Pause' : 'Play'}>
                     {isPlaying ? '⏸' : '▶'}
                  </PlayButton>
                  <SkipButton onClick={this.props.nextSong} title="Next">
                     ⏭
                  </SkipButton>
               </ControlsRow>
            </BottomBar>

            {isEditModalOpen && (
               <ModalOverlay onClick={this.closeEditModal}>
                  <ModalContent onClick={e => e.stopPropagation()}>
                     <ModalTitle>
                        Add / Edit Lyrics ({((SUPPORTED_LYRICS_LANGUAGES.find(l => l.code === currentLang) || {}).native) || 'English'})
                     </ModalTitle>
                     <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                        Paste synchronized lyrics with timestamps like <code>[01:23.45] lyric line</code>, or plain text lyrics.
                     </p>
                     <TextArea
                        value={editText}
                        onChange={e => this.setState({ editText: e.target.value })}
                        placeholder="[00:15.50] Lyric line 1&#10;[00:20.00] Lyric line 2..."
                     />
                     <ModalButtons>
                        <SecondaryButton onClick={this.closeEditModal}>
                           Cancel
                        </SecondaryButton>
                        <ActionButton onClick={this.handleSaveCustomLyrics}>
                           Save Lyrics
                        </ActionButton>
                     </ModalButtons>
                  </ModalContent>
               </ModalOverlay>
            )}
         </Overlay>
      );
   }
}

const mapStateToProps = state => ({
   navState: state.navState,
   audioState: state.audioState,
});

const mapDispatchToProps = dispatch => ({
   toggleLyrics: show => dispatch(toggleLyrics(show)),
   resume: () => dispatch(resume()),
   pause: () => dispatch(pause()),
   nextSong: () => dispatch(nextSong()),
   prevSong: () => dispatch(prevSong()),
   updateTime: info => dispatch(updateTime(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LyricsView);
