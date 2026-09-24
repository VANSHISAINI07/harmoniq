import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeNotesModal, saveSongNote, deleteSongNote } from '../../notes/actions';
import { openPreferencesModal } from '../../preferences/actions';

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.75);
   backdrop-filter: blur(8px);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 10001;
   padding: 16px;
   animation: fadeIn 0.2s ease-out;

   @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
   }
`;

const ModalCard = styled.div`
   width: 100%;
   max-width: 480px;
   background: #141418;
   border-radius: 16px;
   padding: 28px;
   box-shadow: 0 24px 48px rgba(0, 0, 0, 0.85);
   border: 1px solid rgba(255, 255, 255, 0.1);
   position: relative;
   display: flex;
   flex-direction: column;
   gap: 16px;
   animation: slideUp 0.25s ease-out;

   @keyframes slideUp {
      from {
         opacity: 0;
         transform: translateY(16px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }
`;

const CloseButton = styled.button`
   position: absolute;
   top: 18px;
   right: 18px;
   background: transparent;
   border: none;
   color: #b3b3b3;
   font-size: 20px;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 32px;
   height: 32px;
   border-radius: 50%;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
   }
`;

const HeaderRow = styled.div`
   display: flex;
   align-items: center;
   gap: 14px;
`;

const Artwork = styled.img`
   width: 52px;
   height: 52px;
   border-radius: 8px;
   object-fit: cover;
   background: #282828;
   box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
`;

const SongInfo = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 0;
`;

const ModalTitle = styled.h3`
   margin: 0;
   font-size: 17px;
   font-weight: 800;
   color: #ffffff;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const ArtistSubtitle = styled.span`
   font-size: 13px;
   color: #ccff00;
   margin-top: 3px;
   font-weight: 600;
`;

const NoteTextArea = styled.textarea`
   width: 100%;
   min-height: 140px;
   padding: 14px;
   background: #202026;
   border: 1px solid rgba(255, 255, 255, 0.12);
   border-radius: 10px;
   color: #ffffff;
   font-size: 14px;
   line-height: 1.5;
   outline: none;
   resize: vertical;
   box-sizing: border-box;
   font-family: inherit;
   transition: all 0.2s ease;

   &:focus {
      border-color: #ccff00;
      box-shadow: 0 0 0 1px #ccff00;
   }

   &::placeholder {
      color: #727278;
   }
`;

const TimestampText = styled.span`
   font-size: 11px;
   color: #888892;
   align-self: flex-start;
`;

const ButtonRow = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 4px;
   gap: 12px;
`;

const SaveButton = styled.button`
   flex: 1;
   padding: 12px;
   background: #ccff00;
   color: #000000;
   border: none;
   border-radius: 24px;
   font-size: 14px;
   font-weight: 800;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: #d8ff26;
      transform: scale(1.02);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const DeleteButton = styled.button`
   padding: 12px 18px;
   background: transparent;
   border: 1px solid rgba(255, 82, 82, 0.3);
   color: #ff5252;
   border-radius: 24px;
   font-size: 13px;
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 82, 82, 0.15);
      border-color: #ff5252;
   }
`;

class SongNotesModal extends Component {
   state = {
      noteText: '',
   };

   componentDidMount() {
      this.syncActiveNote();
   }

   componentDidUpdate(prevProps) {
      if (
         prevProps.notesState.activeSongForNote !==
         this.props.notesState.activeSongForNote ||
         prevProps.notesState.isNotesModalOpen !==
         this.props.notesState.isNotesModalOpen
      ) {
         this.syncActiveNote();
      }
   }

   getSongKey(song) {
      if (!song) return 'current_track';
      return `${song.name || 'track'}-${song.artist || 'artist'}`.toLowerCase();
   }

   syncActiveNote() {
      const { notesState, audioState } = this.props;
      const { notes, activeSongForNote } = notesState;
      const { playlist, currentIndex } = audioState;
      const currentTrack =
         activeSongForNote ||
         (playlist.length && currentIndex < playlist.length
            ? playlist[currentIndex]
            : null);

      if (currentTrack) {
         const key = this.getSongKey(currentTrack);
         const saved = notes[key];
         this.setState({
            noteText: saved ? saved.text : '',
         });
      }
   }

   handleSave = () => {
      const { notesState, audioState, saveSongNote, closeNotesModal } = this.props;
      const { activeSongForNote } = notesState;
      const { playlist, currentIndex } = audioState;
      const track =
         activeSongForNote ||
         (playlist.length && currentIndex < playlist.length
            ? playlist[currentIndex]
            : { name: 'General Note', artist: 'Harmoniq' });

      const key = this.getSongKey(track);
      saveSongNote({
         songKey: key,
         noteText: this.state.noteText,
         songInfo: {
            name: track.name,
            artist: track.artist,
            artwork: track.artwork,
         },
      });
      closeNotesModal();
   };

   handleDelete = () => {
      const { notesState, audioState, deleteSongNote, closeNotesModal } = this.props;
      const { activeSongForNote } = notesState;
      const { playlist, currentIndex } = audioState;
      const track =
         activeSongForNote ||
         (playlist.length && currentIndex < playlist.length
            ? playlist[currentIndex]
            : null);

      if (track) {
         const key = this.getSongKey(track);
         deleteSongNote(key);
      }
      closeNotesModal();
   };

   render() {
      const { notesState, audioState, closeNotesModal } = this.props;
      const { isNotesModalOpen, notes, activeSongForNote } = notesState;
      const { playlist, currentIndex } = audioState;

      if (!isNotesModalOpen) return null;

      const track =
         activeSongForNote ||
         (playlist.length && currentIndex < playlist.length
            ? playlist[currentIndex]
            : {
                 name: 'Harmoniq Music Note',
                 artist: 'Personal Notes & Memos',
                 artwork: 'images/default_artwork.svg',
              });

      const key = this.getSongKey(track);
      const existingNote = notes[key];
      const artworkSrc =
         track.artwork &&
         (track.artwork.startsWith('http') || track.artwork.startsWith('images'))
            ? track.artwork
            : 'images/default_artwork.svg';

      return (
         <ModalBackdrop onClick={closeNotesModal}>
            <ModalCard onClick={e => e.stopPropagation()}>
               <CloseButton onClick={closeNotesModal}>✕</CloseButton>

               <HeaderRow>
                  <Artwork
                     src={artworkSrc}
                     onError={e => {
                        e.target.src = 'images/default_artwork.svg';
                     }}
                     alt={track.name}
                  />
                  <SongInfo>
                     <ModalTitle>{track.name}</ModalTitle>
                     <ArtistSubtitle>{track.artist}</ArtistSubtitle>
                  </SongInfo>
               </HeaderRow>

               <NoteTextArea
                  placeholder="Write your memories, favorite lyrics, mood, or thoughts on this song..."
                  value={this.state.noteText}
                  onChange={e => this.setState({ noteText: e.target.value })}
                  autoFocus
               />

               {existingNote && existingNote.updatedAt && (
                  <TimestampText>
                     Last saved: {existingNote.updatedAt}
                  </TimestampText>
               )}

               <ButtonRow>
                  {existingNote && (
                     <DeleteButton onClick={this.handleDelete}>
                        Delete Note
                     </DeleteButton>
                  )}
                  <SaveButton onClick={this.handleSave}>
                     Save Note <span role="img" aria-label="note">📝</span>
                  </SaveButton>
               </ButtonRow>

               <div style={{ textAlign: 'center', marginTop: '6px' }}>
                  <button
                     type="button"
                     style={{
                        background: 'none',
                        border: 'none',
                        color: '#1ed760',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                     }}
                     onClick={() => {
                        this.props.closeNotesModal();
                        this.props.openPreferencesModal();
                     }}>
                     Want to write your overall music preferences & favorite genres instead? Click here <span role="img" aria-label="gear">⚙️</span>
                  </button>
               </div>
            </ModalCard>
         </ModalBackdrop>
      );
   }
}

const mapStateToProps = state => ({
   notesState: state.notesState,
   audioState: state.audioState,
});

const mapDispatchToProps = dispatch => ({
   closeNotesModal: () => dispatch(closeNotesModal()),
   saveSongNote: data => dispatch(saveSongNote(data)),
   deleteSongNote: key => dispatch(deleteSongNote(key)),
   openPreferencesModal: () => dispatch(openPreferencesModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongNotesModal);
