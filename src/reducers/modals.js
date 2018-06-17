import shortId from 'shortId';

// Action types
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const REMOVE_MODAL = 'REMOVE_MODAL';

// Initial state
const initialState = [];

// Action creators
export const showModal = (modalType, modalProps) => ({
  type: SHOW_MODAL,
  modal: {
    id: shortId.generate(),
    type: modalType,
    props: modalProps
  }
});

export const hideModal = (id) => ({ type: HIDE_MODAL, id });
export const removeModal = (id) => ({ type: REMOVE_MODAL, id });

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return state.concat(withIsOpen(true, action.modal));

    case HIDE_MODAL:
      return state.map((m) => m.id !== action.id ? m : withIsOpen(false, m));

    case REMOVE_MODAL:
      return state.filter((m) => m.id !== action.id);

    default:
      return state;
  }
}

// Helpers
const withIsOpen = (isOpen, modal) => Object.assign({}, modal, { isOpen: isOpen });

// Selectors
export const getModals = (state) => state.modals;

export default reducer;