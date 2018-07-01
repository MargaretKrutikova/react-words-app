// @flow
import { combineReducers } from 'redux';
import words from './words';
import modals from './modals';
import type { ModalState } from './modals';

export type GlobalState = {
  modals: ModalState
};

const rootReducer = combineReducers({
  words,
  modals
});

export default rootReducer;
