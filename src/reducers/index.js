import { combineReducers } from 'redux';
import words from './wordsReducer';
import modals from './modals';

const rootReducer = combineReducers({
  words,
  modals
});

export default rootReducer;
