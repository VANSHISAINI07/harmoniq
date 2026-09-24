import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateTime } from '../../../../audio/actions';
import { constants } from '../../../../toolbox';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const { color } = constants;

const Container = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   width: 90%;
   margin: 3vh auto 1vh auto;
   height: 5vh;

   .rangeslider-horizontal.time-slider,
   .scrubber {
      height: 6px;
      width: 90%;
      margin: auto;
      box-shadow: none;
      cursor: pointer;

      .rangeslider__fill {
         background: ${color.red[4]};
         box-shadow: none;
         border-radius: 3px;
      }

      .rangeslider__handle {
         width: 28px;
         height: 28px;
         background: white;
         border: 1px solid rgba(0, 0, 0, 0.15);
         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
         cursor: grab;
         outline: none;
         border-radius: 50%;

         &:active {
            cursor: grabbing;
            background: ${color.red[4]};
            border: 2px solid white;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
         }

         &::after {
            display: none;
         }
      }
   }

   .scrubber .rangeslider__handle {
      width: 28px;
      height: 28px;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
      cursor: grab;
      outline: none;
      border-radius: 50%;

      &:active {
         cursor: grabbing;
         background: ${color.red[4]};
         border: 2px solid white;
         box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
      }
   }
`;

const TimeContainer = styled.div`
   display: flex;
   justify-content: space-between;
   width: 90%;
   margin: auto;
`;

const Time = styled.h5`
   font-weight: normal;
   margin: 8px 0;
   color: ${props => (props.isChanging ? color.red[4] : color.gray[6])};
   transform: ${props => props.shift && 'translateY(10px)'};
   transition: all 0.15s ease;
`;

export function formatTime(seconds = 0, guide = seconds) {
   let s = Math.floor(seconds % 60);
   let m = Math.floor((seconds / 60) % 60);
   let h = Math.floor(seconds / 3600);
   const gm = Math.floor((guide / 60) % 60);
   const gh = Math.floor(guide / 3600);

   if (isNaN(seconds) || seconds === Infinity) {
      h = m = s = '-';
   }

   h = h > 0 || gh > 0 ? `${h}:` : '';
   m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`;
   s = s < 10 ? `0${s}` : s;

   return h + m + s;
}

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      updateTime: info => dispatch(updateTime(info)),
   };
};

class Scrubber extends Component {
   state = {
      isChanging: false,
      scrubVal: 0,
   };

   isDragging = false;
   lastSeek = 0;

   startChange = () => {
      this.isDragging = true;
      const { audioState } = this.props;
      const current = (audioState.time && audioState.time.current) || 0;
      this.setState({
         isChanging: true,
         scrubVal: current,
      });
   };

   handleChange = val => {
      this.setState({
         scrubVal: val,
      });

      // Throttle audio seek during dragging so browser decoder doesn't stutter
      const now = Date.now();
      if (!this.lastSeek || now - this.lastSeek > 120) {
         this.lastSeek = now;
         const audio = document.getElementById('audio');
         if (audio && !isNaN(val)) {
            audio.currentTime = val;
         }
      }
   };

   endChange = () => {
      const audio = document.getElementById('audio');
      const targetTime = this.state.scrubVal;
      if (audio && typeof targetTime === 'number' && !isNaN(targetTime)) {
         audio.currentTime = targetTime;
      }
      this.props.updateTime({
         current: targetTime,
         max: (this.props.audioState.time && this.props.audioState.time.max) || 1,
      });
      setTimeout(() => {
         this.setState({
            isChanging: false,
         });
         this.isDragging = false;
      }, 80);
   };

   render() {
      const { audioState } = this.props;
      const { isChanging, scrubVal } = this.state;
      const max = (audioState.time && audioState.time.max) || 1;
      const current = isChanging
         ? (typeof scrubVal === 'number' ? scrubVal : 0)
         : ((audioState.time && audioState.time.current) || 0);

      return (
         <Container isChanging={isChanging}>
            <Slider
               className="scrubber"
               tooltip={false}
               value={current}
               max={max}
               step={0.1}
               onChange={this.handleChange}
               onChangeStart={this.startChange}
               onChangeComplete={this.endChange}
            />
            <TimeContainer>
               <Time isChanging={isChanging}>
                  {formatTime(current)}
               </Time>
               <Time>
                  -{formatTime(Math.max(0, max - current))}
               </Time>
            </TimeContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scrubber);
