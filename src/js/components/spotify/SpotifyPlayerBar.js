import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {
   resume,
   pause,
   nextSong,
   prevSong,
   updateTime,
   changeVolume,
} from '../../audio/actions';
import { toggleLyrics } from '../bar/actions';
import { openNotesModal } from '../../notes/actions';
import { openPreferencesModal } from '../../preferences/actions';
import LyricsView from '../lyrics';
import { formatTime } from '../bar/components/controls/scrubber';

const BarContainer = styled.footer`
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   height: 80px;
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#000000')};
   border-top: 1px solid
      ${props => (props.themeMode === 'light' ? '#e5e7eb' : '#282828')};
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 16px;
   z-index: 150;
   user-select: none;
   transition: background 0.25s ease, border-color 0.25s ease;

   @media screen and (max-width: 768px) {
      height: 72px;
      padding: 0 10px;
   }
`;

const LeftSection = styled.div`
   display: flex;
   align-items: center;
   gap: 14px;
   width: 30%;
   min-width: 180px;

   @media screen and (max-width: 600px) {
      min-width: 130px;
      gap: 10px;
   }
`;

const CoverArt = styled.img`
   width: 56px;
   height: 56px;
   border-radius: 4px;
   object-fit: cover;
   background: #282828;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
   flex-shrink: 0;

   @media screen and (max-width: 600px) {
      width: 44px;
      height: 44px;
   }
`;

const TrackDetails = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
   overflow: hidden;
`;

const TrackName = styled.span`
   font-size: 14px;
   font-weight: 700;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }

   @media screen and (max-width: 600px) {
      font-size: 12px;
   }
`;

const ArtistName = styled.span`
   font-size: 11px;
   color: #b3b3b3;
   margin-top: 3px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   cursor: pointer;

   &:hover {
      color: #ffffff;
      text-decoration: underline;
   }
`;

const LikeButton = styled.button`
   background: transparent;
   border: none;
   color: ${props => (props.liked ? '#1ed760' : '#b3b3b3')};
   font-size: 16px;
   cursor: pointer;
   padding: 4px;
   display: flex;
   align-items: center;
   transition: all 0.2s ease;

   &:hover {
      color: ${props => (props.liked ? '#1ed760' : '#ffffff')};
      transform: scale(1.15);
   }

   @media screen and (max-width: 700px) {
      display: none;
   }
`;

const CenterSection = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   max-width: 720px;
   width: 40%;
   flex: 1;
   gap: 6px;
`;

const ControlsRow = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;

   @media screen and (max-width: 600px) {
      gap: 10px;
   }
`;

const ControlButton = styled.button`
   background: transparent;
   border: none;
   color: ${props => (props.active ? '#1ed760' : '#b3b3b3')};
   font-size: ${props => props.size || '16px'};
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 4px;
   transition: all 0.15s ease;

   &:hover {
      color: ${props => (props.active ? '#1ed760' : '#ffffff')};
      transform: scale(1.08);
   }

   &:active {
      transform: scale(0.95);
   }
`;

const PlayPauseCircle = styled.button`
   width: 36px;
   height: 36px;
   border-radius: 50%;
   background: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   color: ${props => (props.themeMode === 'light' ? '#ffffff' : '#000000')};
   border: none;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   font-size: 15px;
   font-weight: 900;
   transition: all 0.2s ease;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

   &:hover {
      transform: scale(1.08);
   }

   &:active {
      transform: scale(0.96);
   }
`;

const ProgressRow = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   width: 100%;
   max-width: 580px;

   .rangeslider-horizontal {
      height: 4px;
      margin: 0;
      background: #4d4d4d;
      border-radius: 2px;
      box-shadow: none;
      cursor: pointer;
      flex: 1;

      .rangeslider__fill {
         background: #ffffff;
         border-radius: 2px;
         box-shadow: none;
         transition: background 0.1s ease;
      }

      .rangeslider__handle {
         display: none;
         width: 12px;
         height: 12px;
         background: #ffffff;
         border-radius: 50%;
         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
         border: none;
         outline: none;

         &::after,
         &:after {
            display: none !important;
            content: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
         }
      }

      .rangeslider__handle-tooltip {
         display: none !important;
      }

      &:hover {
         .rangeslider__fill {
            background: #1ed760;
         }

         .rangeslider__handle {
            display: block;
         }
      }
   }
`;

const TimeLabel = styled.span`
   font-size: 11px;
   color: #b3b3b3;
   font-variant-numeric: tabular-nums;
   min-width: 36px;
   text-align: center;
`;

const RightSection = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   gap: 12px;
   width: 30%;
   min-width: 180px;

   @media screen and (max-width: 600px) {
      min-width: auto;
      gap: 6px;
   }
`;

const LyricsButton = styled.button`
   background: ${props =>
      props.active
         ? 'rgba(30, 215, 96, 0.2)'
         : 'transparent'};
   border: 1px solid
      ${props => (props.active ? '#1ed760' : 'transparent')};
   color: ${props => (props.active ? '#1ed760' : '#b3b3b3')};
   border-radius: 16px;
   padding: 4px 10px;
   font-size: 12px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 4px;
   transition: all 0.2s ease;

   &:hover {
      color: #1ed760;
      border-color: #1ed760;
      transform: scale(1.05);
   }

   @media screen and (max-width: 500px) {
      padding: 4px 6px;
      span.btn-text {
         display: none;
      }
   }
`;

const NotesButton = styled.button`
   background: ${props =>
      props.hasNote ? 'rgba(30, 215, 96, 0.2)' : 'transparent'};
   border: 1px solid
      ${props =>
         props.hasNote
            ? '#1ed760'
            : props.themeMode === 'light'
               ? '#d1d5db'
               : '#4d4d4d'};
   color: ${props =>
      props.hasNote
         ? '#1ed760'
         : props.themeMode === 'light'
            ? '#374151'
            : '#b3b3b3'};
   border-radius: 16px;
   padding: 4px 10px;
   font-size: 12px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 5px;
   position: relative;
   transition: all 0.2s ease;

   &:hover {
      color: #1ed760;
      border-color: #1ed760;
      transform: scale(1.05);
   }

   @media screen and (max-width: 500px) {
      padding: 4px 6px;
      span.btn-text {
         display: none;
      }
   }
`;

const NoteActiveDot = styled.span`
   width: 6px;
   height: 6px;
   border-radius: 50%;
   background: #1ed760;
   box-shadow: 0 0 6px #1ed760;
`;

const SmoothMixPill = styled.button`
   background: ${props =>
      props.active ? 'rgba(30, 215, 96, 0.14)' : 'transparent'};
   border: 1px solid
      ${props =>
         props.active
            ? 'rgba(30, 215, 96, 0.45)'
            : props.themeMode === 'light'
               ? '#d1d5db'
               : '#4d4d4d'};
   color: ${props =>
      props.active
         ? '#1ed760'
         : props.themeMode === 'light'
            ? '#374151'
            : '#b3b3b3'};
   border-radius: 16px;
   padding: 4px 9px;
   font-size: 11px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 4px;
   transition: all 0.2s ease;

   &:hover {
      color: #1ed760;
      border-color: #1ed760;
      transform: scale(1.05);
   }

   @media screen and (max-width: 650px) {
      display: none;
   }
`;

const VolumeContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   width: 110px;

   .rangeslider-horizontal {
      height: 4px;
      margin: 0;
      background: #4d4d4d;
      border-radius: 2px;
      box-shadow: none;
      cursor: pointer;
      flex: 1;

      .rangeslider__fill {
         background: #ffffff;
         border-radius: 2px;
         box-shadow: none;
         transition: background 0.1s ease;
      }

      .rangeslider__handle {
         display: none;
         width: 12px;
         height: 12px;
         background: #ffffff;
         border-radius: 50%;
         border: none;
         outline: none;

         &::after,
         &:after {
            display: none !important;
            content: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
         }
      }

      .rangeslider__handle-tooltip {
         display: none !important;
      }

      &:hover {
         .rangeslider__fill {
            background: #1ed760;
         }

         .rangeslider__handle {
            display: block;
         }
      }
   }

   @media screen and (max-width: 700px) {
      display: none;
   }
`;

class SpotifyPlayerBar extends Component {
   state = {
      isChangingTime: false,
      scrubVal: 0,
      isShuffle: false,
      isRepeat: false,
      isLiked: false,
      activeChannel: 0,
   };

   audio0 = null;
   audio1 = null;
   isCrossfading = false;
   crossfadeInterval = null;
   isDragging = false;
   lastSeek = 0;
   playInterval = null;

   getActiveAudio = () => {
      return this.state.activeChannel === 0 ? this.audio0 : this.audio1;
   };

   getSecondaryAudio = () => {
      return this.state.activeChannel === 0 ? this.audio1 : this.audio0;
   };

   getNextTrack = () => {
      const { audioState } = this.props;
      const { queue, inQueue, playlist, currentIndex } = audioState;
      if (queue.length > 1 && inQueue) {
         return queue[1];
      }
      if (playlist.length && currentIndex + 1 < playlist.length) {
         return playlist[currentIndex + 1];
      }
      if (this.state.isRepeat && playlist.length) {
         return playlist[0];
      }
      return null;
   };

   componentDidMount() {
      const { audioState } = this.props;
      const { playlist, currentIndex } = audioState;
      const track = playlist && playlist[currentIndex];
      if (track && track.url && this.audio0) {
         const url = track.url.startsWith('http')
            ? track.url
            : `https://tannerv.ddns.net/SpotiFree/${track.url}`;
         this.audio0.src = url;
         this.audio0.volume =
            typeof audioState.volume === 'number' ? audioState.volume : 0.5;
      }
   }

   componentDidUpdate(prevProps) {
      const { audioState } = this.props;
      const { isPlaying, volume, playlist, currentIndex } = audioState;
      const prevAudioState = prevProps.audioState;

      const active = this.getActiveAudio();

      if (!this.isCrossfading && active && typeof volume === 'number') {
         active.volume = volume;
      }

      const currentTrack = (playlist && playlist[currentIndex]) || null;
      const prevTrack =
         (prevAudioState.playlist &&
            prevAudioState.playlist[prevAudioState.currentIndex]) ||
         null;
      const songChanged =
         !prevTrack || !currentTrack || currentTrack.url !== prevTrack.url;

      if (songChanged && currentTrack && currentTrack.url) {
         const targetUrl = currentTrack.url.startsWith('http')
            ? currentTrack.url
            : `https://tannerv.ddns.net/SpotiFree/${currentTrack.url}`;

         if (active && active.src !== targetUrl) {
            this.cancelCrossfade();
            active.src = targetUrl;
            active.currentTime = 0;
            active.volume = typeof volume === 'number' ? volume : 0.5;
            if (isPlaying) {
               this.handleAudioPlay();
            }
         }
      }

      if (isPlaying && active) {
         this.handleAudioPlay();
      } else if (!isPlaying && active && active.src) {
         this.handleAudioPause();
      }
   }

   handleAudioPlay = () => {
      const active = this.getActiveAudio();
      if (active && active.paused) {
         clearInterval(this.playInterval);
         const playPromise = active.play();
         if (playPromise && playPromise.then) {
            playPromise
               .then(() => {
                  this.createTimeInterval();
               })
               .catch(e => {
                  console.warn('Audio play was prevented:', e);
               });
         }
      }
      if (this.isCrossfading) {
         const secondary = this.getSecondaryAudio();
         if (secondary && secondary.paused) {
            secondary.play().catch(() => {});
         }
      }
   };

   handleAudioPause = () => {
      const active = this.getActiveAudio();
      const secondary = this.getSecondaryAudio();
      if (active && !active.paused) {
         active.pause();
      }
      if (secondary && !secondary.paused) {
         secondary.pause();
      }
      clearInterval(this.playInterval);
   };

   createTimeInterval() {
      this.playInterval = setInterval(() => {
         this.handleTimeUpdate();
      }, 250);
   }

   handleTimeUpdate = () => {
      const active = this.getActiveAudio();
      if (active && !this.isDragging) {
         const currentTime = active.currentTime;
         const duration = active.duration || 1;

         this.props.updateTime({
            current: currentTime,
            max: duration,
         });

         // Apple Music Smooth Mix Crossfade Check
         const prefs =
            (this.props.preferencesState &&
               this.props.preferencesState.preferences) ||
            {};
         const smoothMix = prefs.smoothMix !== false;
         const crossfadeSec = smoothMix ? prefs.crossfadeSeconds || 4 : 0;

         if (crossfadeSec > 0 && duration > crossfadeSec * 2) {
            const remaining = duration - currentTime;
            const nextTrack = this.getNextTrack();

            if (remaining <= crossfadeSec && nextTrack && !this.isCrossfading) {
               this.startCrossfade(nextTrack, crossfadeSec);
            }
         }
      }
   };

   startCrossfade = (nextTrack, crossfadeSec) => {
      const active = this.getActiveAudio();
      const secondary = this.getSecondaryAudio();
      if (!active || !secondary || !nextTrack) return;

      this.isCrossfading = true;

      const nextUrl =
         nextTrack.url && nextTrack.url.startsWith('http')
            ? nextTrack.url
            : `https://tannerv.ddns.net/SpotiFree/${nextTrack.url}`;

      secondary.src = nextUrl;
      secondary.currentTime = 0;
      secondary.volume = 0;

      const playPromise = secondary.play();
      if (playPromise && playPromise.then) {
         playPromise.catch(e => {
            console.warn('Crossfade preload prevented:', e);
         });
      }

      const userVolume =
         typeof this.props.audioState.volume === 'number'
            ? this.props.audioState.volume
            : 0.5;
      const stepInterval = 80;
      const totalSteps = (crossfadeSec * 1000) / stepInterval;
      let step = 0;

      clearInterval(this.crossfadeInterval);
      this.crossfadeInterval = setInterval(() => {
         step++;
         const progress = Math.min(1, step / totalSteps);

         // Studio Equal-Power Crossfade curve (Apple Music style)
         const fadeOut = userVolume * Math.cos(progress * 0.5 * Math.PI);
         const fadeIn = userVolume * Math.sin(progress * 0.5 * Math.PI);

         if (active) {
            active.volume = Math.max(0, Math.min(1, fadeOut));
         }
         if (secondary) {
            secondary.volume = Math.max(0, Math.min(1, fadeIn));
         }

         if (progress >= 1 || (active && active.ended)) {
            clearInterval(this.crossfadeInterval);
            this.finishCrossfade();
         }
      }, stepInterval);
   };

   finishCrossfade = () => {
      clearInterval(this.crossfadeInterval);
      this.isCrossfading = false;

      const active = this.getActiveAudio();
      const secondary = this.getSecondaryAudio();

      if (active) {
         active.pause();
         active.currentTime = 0;
      }

      const userVolume =
         typeof this.props.audioState.volume === 'number'
            ? this.props.audioState.volume
            : 0.5;
      if (secondary) {
         secondary.volume = userVolume;
      }

      const nextChannel = this.state.activeChannel === 0 ? 1 : 0;
      this.setState({ activeChannel: nextChannel }, () => {
         this.props.nextSong();
      });
   };

   cancelCrossfade = () => {
      clearInterval(this.crossfadeInterval);
      this.isCrossfading = false;
      const userVolume =
         typeof this.props.audioState.volume === 'number'
            ? this.props.audioState.volume
            : 0.5;
      const active = this.getActiveAudio();
      const secondary = this.getSecondaryAudio();

      if (active) {
         active.volume = userVolume;
      }
      if (secondary) {
         secondary.pause();
         secondary.src = '';
      }
   };

   handleChannelEnded = channel => {
      if (channel === this.state.activeChannel) {
         if (this.isCrossfading) {
            this.finishCrossfade();
         } else {
            this.props.nextSong();
         }
      }
   };

   handleNext = () => {
      this.cancelCrossfade();
      this.props.nextSong();
   };

   handlePrev = () => {
      this.cancelCrossfade();
      this.props.prevSong();
   };

   startChange = () => {
      this.cancelCrossfade();
      this.isDragging = true;
      const { audioState } = this.props;
      const current = (audioState.time && audioState.time.current) || 0;
      this.setState({
         isChangingTime: true,
         scrubVal: current,
      });
   };

   handleChange = val => {
      this.setState({ scrubVal: val });
      const now = Date.now();
      if (!this.lastSeek || now - this.lastSeek > 120) {
         this.lastSeek = now;
         const active = this.getActiveAudio();
         if (active && !isNaN(val)) {
            active.currentTime = val;
         }
      }
   };

   endChange = () => {
      const targetTime = this.state.scrubVal;
      const active = this.getActiveAudio();
      if (active && typeof targetTime === 'number' && !isNaN(targetTime)) {
         active.currentTime = targetTime;
      }
      this.props.updateTime({
         current: targetTime,
         max: (this.props.audioState.time && this.props.audioState.time.max) || 1,
      });
      setTimeout(() => {
         this.setState({ isChangingTime: false });
         this.isDragging = false;
      }, 80);
   };

   handleVolumeChange = val => {
      const newVol = Math.max(0, Math.min(1, val / 100));
      this.props.changeVolume(newVol);
      const active = this.getActiveAudio();
      if (active && !this.isCrossfading) {
         active.volume = newVol;
      }
   };

   togglePlay = () => {
      const { audioState, resume, pause } = this.props;
      if (audioState.isPlaying) {
         pause();
      } else {
         resume();
      }
   };

   render() {
      const {
         audioState,
         navState,
         toggleLyrics,
         themeState,
         notesState,
         openNotesModal,
         preferencesState,
         openPreferencesModal,
      } = this.props;
      const { queue, inQueue, playlist, currentIndex, isPlaying, volume } =
         audioState;
      const { showLyrics } = navState;
      const { isChangingTime, scrubVal, isShuffle, isRepeat, isLiked } =
         this.state;

      const prefs =
         (preferencesState && preferencesState.preferences) || {};
      const smoothMix = prefs.smoothMix !== false;
      const crossfadeSec = smoothMix ? prefs.crossfadeSeconds || 4 : 0;

      const themeMode = (themeState && themeState.theme) || 'dark';

      const track =
         queue.length && inQueue
            ? queue[0]
            : playlist.length && currentIndex < playlist.length
               ? playlist[currentIndex]
               : {
                    name: 'Select a song to play',
                    artist: 'Harmoniq Audio Engine',
                    album: 'Harmoniq',
                    artwork: 'images/default_artwork.svg',
                 };

      const songKey = track && track.name ? `${track.name} - ${track.artist}` : null;
      const hasNote = Boolean(
         songKey &&
         notesState &&
         notesState.notes &&
         (notesState.notes[songKey] || (track && notesState.notes[track.name]))
      );

      const max = (audioState.time && audioState.time.max) || 1;
      const current = isChangingTime
         ? typeof scrubVal === 'number'
            ? scrubVal
            : 0
         : (audioState.time && audioState.time.current) || 0;

      const artworkSrc =
         track.artwork && (track.artwork.startsWith('http') || track.artwork.startsWith('images'))
            ? track.artwork
            : track.artwork
               ? `https://tannerv.ddns.net/SpotiFree/${track.artwork}`
               : 'images/default_artwork.svg';

      return (
         <React.Fragment>
            <BarContainer themeMode={themeMode}>
               {/* Left Section: Track Info */}
               <LeftSection>
                  <CoverArt
                     src={artworkSrc}
                     onError={e => {
                        e.target.src = 'images/default_artwork.svg';
                     }}
                     alt={track.name}
                  />
                  <TrackDetails>
                     <TrackName themeMode={themeMode} title={track.name}>
                        {track.name}
                     </TrackName>
                     <ArtistName title={track.artist}>{track.artist}</ArtistName>
                  </TrackDetails>
                  <LikeButton
                     liked={isLiked}
                     onClick={() => this.setState({ isLiked: !isLiked })}
                     title={isLiked ? 'Remove from Your Library' : 'Save to Your Library'}>
                     {isLiked ? (
                        <span role="img" aria-label="liked">💚</span>
                     ) : (
                        <span role="img" aria-label="unliked">🤍</span>
                     )}
                  </LikeButton>
               </LeftSection>

               {/* Center Section: Controls & Scrubber */}
               <CenterSection>
                  <ControlsRow>
                     <ControlButton
                        active={isShuffle}
                        onClick={() => this.setState({ isShuffle: !isShuffle })}
                        title="Enable shuffle">
                        <span role="img" aria-label="shuffle">🔀</span>
                     </ControlButton>
                     <ControlButton onClick={this.handlePrev} title="Previous">
                        <span role="img" aria-label="previous">⏮</span>
                     </ControlButton>
                     <PlayPauseCircle
                        themeMode={themeMode}
                        onClick={this.togglePlay}
                        title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? (
                           <span role="img" aria-label="pause">⏸</span>
                        ) : (
                           <span role="img" aria-label="play">▶</span>
                        )}
                     </PlayPauseCircle>
                     <ControlButton onClick={this.handleNext} title="Next">
                        <span role="img" aria-label="next">⏭</span>
                     </ControlButton>
                     <ControlButton
                        active={isRepeat}
                        onClick={() => this.setState({ isRepeat: !isRepeat })}
                        title="Enable repeat">
                        <span role="img" aria-label="repeat">🔁</span>
                     </ControlButton>
                  </ControlsRow>

                  <ProgressRow>
                     <TimeLabel>{formatTime(current)}</TimeLabel>
                     <Slider
                        tooltip={false}
                        value={current}
                        max={max}
                        step={0.1}
                        onChange={this.handleChange}
                        onChangeStart={this.startChange}
                        onChangeComplete={this.endChange}
                     />
                     <TimeLabel>{formatTime(max)}</TimeLabel>
                  </ProgressRow>
               </CenterSection>

               {/* Right Section: Lyrics, Notes, Smooth Mix & Volume */}
               <RightSection>
                  <NotesButton
                     themeMode={themeMode}
                     hasNote={hasNote}
                     onClick={() => openNotesModal(track)}
                     title="Song Notes (Write personal memos & thoughts)">
                     <span role="img" aria-label="memo">📝</span>
                     <span className="btn-text">Notes</span>
                     {hasNote && <NoteActiveDot />}
                  </NotesButton>

                  <SmoothMixPill
                     active={smoothMix}
                     onClick={openPreferencesModal}
                     themeMode={themeMode}
                     title={`Apple Music Smooth Mix Active (${crossfadeSec}s crossfade blend). Click to configure in Preferences.`}>
                     <span role="img" aria-label="equalizer">🎛️</span>
                     <span className="btn-text">Mix {crossfadeSec}s</span>
                  </SmoothMixPill>

                  <LyricsButton
                     active={showLyrics}
                     onClick={() => toggleLyrics(!showLyrics)}
                     title="Lyrics (LRCLIB Synchronized)">
                     <span role="img" aria-label="microphone">🎤</span> Lyrics
                  </LyricsButton>

                  <VolumeContainer>
                     <span style={{ fontSize: '14px', color: '#b3b3b3' }}>
                        {volume === 0 ? (
                           <span role="img" aria-label="muted">🔇</span>
                        ) : volume < 0.5 ? (
                           <span role="img" aria-label="medium volume">🔉</span>
                        ) : (
                           <span role="img" aria-label="loud volume">🔊</span>
                        )}
                     </span>
                     <Slider
                        tooltip={false}
                        value={volume * 100}
                        onChange={this.handleVolumeChange}
                     />
                  </VolumeContainer>
               </RightSection>

               {/* Dual Audio Elements for Seamless Apple Music-Style Smooth Mix & Crossfade */}
               <audio
                  ref={el => {
                     this.audio0 = el;
                  }}
                  id="audio-channel-0"
                  onEnded={() => this.handleChannelEnded(0)}
                  onTimeUpdate={() => {
                     if (this.state.activeChannel === 0) {
                        this.handleTimeUpdate();
                     }
                  }}
               />
               <audio
                  ref={el => {
                     this.audio1 = el;
                  }}
                  id="audio-channel-1"
                  onEnded={() => this.handleChannelEnded(1)}
                  onTimeUpdate={() => {
                     if (this.state.activeChannel === 1) {
                        this.handleTimeUpdate();
                     }
                  }}
               />
            </BarContainer>
            <LyricsView />
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => ({
   audioState: state.audioState,
   navState: state.navState,
   themeState: state.themeState,
   notesState: state.notesState,
   preferencesState: state.preferencesState,
});

const mapDispatchToProps = dispatch => ({
   resume: () => dispatch(resume()),
   pause: () => dispatch(pause()),
   nextSong: () => dispatch(nextSong()),
   prevSong: () => dispatch(prevSong()),
   updateTime: info => dispatch(updateTime(info)),
   changeVolume: vol => dispatch(changeVolume(vol)),
   toggleLyrics: show => dispatch(toggleLyrics(show)),
   openNotesModal: song => dispatch(openNotesModal(song)),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyPlayerBar);
