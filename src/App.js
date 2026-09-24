import React, { Component } from 'react';
import MusicJS from './js';
import { injectGlobal } from 'styled-components';

injectGlobal`
   * {
      box-sizing: border-box;
   }

   body {
      margin: 0;
      padding: 0;
      background: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Circular Spotify Tx T", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow: hidden;
      user-select: none;
   }

   ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
   }

   ::-webkit-scrollbar-track {
      background: transparent;
   }

   ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
   }

   ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4);
   }

   /* Prevent default grey dot / after pseudo-element and tooltip in react-rangeslider */
   .rangeslider .rangeslider__handle:after,
   .rangeslider .rangeslider__handle::after,
   .rangeslider-horizontal .rangeslider__handle:after,
   .rangeslider-horizontal .rangeslider__handle::after {
      display: none !important;
      content: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      width: 0 !important;
      height: 0 !important;
   }

   .rangeslider .rangeslider__handle-tooltip,
   .rangeslider__handle-tooltip {
      display: none !important;
   }
`;

class App extends Component {
   render() {
      return (
         <div className="App">
            <MusicJS />
         </div>
      );
   }
}

document.addEventListener('touchstart', function() {}, true);

export default App;
