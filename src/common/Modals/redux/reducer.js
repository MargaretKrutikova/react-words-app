// @flow
import shortId from 'shortid';
import type { GlobalState } from 'Reducers/';
import type { Modal, ModalTypeProps } from '../types';

export type ModalState = Array<Modal>;

type ShowModalAction = { type: typeof SHOW_MODAL, modal: Modal };
type HideModalAction = { type: typeof HIDE_MODAL, id: string };
type RemoveModalAction = { type: typeof REMOVE_MODAL, id: string };

type ModalAction = ShowModalAction | HideModalAction | RemoveModalAction;

// Action types
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const REMOVE_MODAL = 'REMOVE_MODAL';

// Initial state
const initialState: ModalState = [];

// Action creators
export const showModal = (modal: ModalTypeProps): ShowModalAction => ({
  type: SHOW_MODAL,
  modal: {
    id: shortId.generate(),
    modalProps: modal,
    isOpen: true
  }
});

export const hideModal = (id: string) => ({ type: HIDE_MODAL, id });
export const removeModal = (id: string) => ({ type: REMOVE_MODAL, id });

// Reducer
const reducer = (
  state: ModalState = initialState,
  action: ModalAction
): Array<Modal> => {
  switch (action.type) {
    case SHOW_MODAL: {
      const { modal } = action;
      return state.concat(modal);
    }

    case HIDE_MODAL: {
      const { id } = action;
      return state.map((m: Modal) => (m.id !== id ? m : withIsOpen(false, m)));
    }

    case REMOVE_MODAL: {
      const { id } = action;
      return state.filter((m: Modal) => m.id !== id);
    }

    default:
      return state;
  }
};

// Helpers
const withIsOpen = (isOpen: boolean, modal: Modal): Modal =>
  Object.assign({}, modal, { isOpen: isOpen });

// Selectors
export const getModals = (state: GlobalState) => state.modals;

export default reducer;
