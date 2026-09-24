import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import viewReducer from './views/reducer';
import apiReducer from './api/reducer';
import audioReducer from './audio/reducer';
import navReducer from './components/bar/reducer';
import authReducer from './auth/reducer';
import themeReducer from './theme/reducer';
import notesReducer from './notes/reducer';
import notificationsReducer from './notifications/reducer';
import installReducer from './install/reducer';
import searchReducer from './search/reducer';
import preferencesReducer from './preferences/reducer';
import feedbackReducer from './feedback/reducer';

const rootReducer = combineReducers({
   viewState: viewReducer,
   apiState: apiReducer,
   audioState: audioReducer,
   navState: navReducer,
   authState: authReducer,
   themeState: themeReducer,
   notesState: notesReducer,
   notificationsState: notificationsReducer,
   installState: installReducer,
   searchState: searchReducer,
   preferencesState: preferencesReducer,
   feedbackState: feedbackReducer,
});

const store = createStore(
   rootReducer,
   devToolsEnhancer(),
   applyMiddleware(thunkMiddleware),
);

export default store;
