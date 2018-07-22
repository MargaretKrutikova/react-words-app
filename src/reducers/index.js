// @flow
import { combineReducers } from 'redux';
import words from './words';
import { reducer as modals } from 'Common/Modals';
import type { ModalState } from 'Common/Modals';
import { reducer as toasts } from 'Common/Toasts';
import type { ToastState } from 'Common/Toasts';

export type GlobalState = {
  toasts: ToastState,
  modals: ModalState
};

const rootReducer = combineReducers({
  words,
  modals,
  toasts
});

export default rootReducer;
