import { combineReducers } from 'redux';
import words from './words';
import modals from './modals';

const rootReducer = combineReducers({
  words,
  modals
});

export default rootReducer;
