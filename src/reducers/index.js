import { combineReducers } from 'redux';
import words from './wordsReducer';

const rootReducer = combineReducers({
  words
});

export default rootReducer;
