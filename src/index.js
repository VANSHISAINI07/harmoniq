import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './js/rootReducer';
import { initializeHarmoniqSecurity } from './js/utils/signature';

// Initialize hidden cryptographic watermark & creator verification locks
initializeHarmoniqSecurity();

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
);
registerServiceWorker();
