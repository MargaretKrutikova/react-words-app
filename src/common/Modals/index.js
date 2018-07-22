// @flow
import modalsReducer, {
  showModal,
  hideModal,
  getModals
} from './redux/reducer';
import ModalRoot from './ModalRoot';

export const actions = { showModal, hideModal };
export const selectors = { getModals };
export const reducer = modalsReducer;

export { ModalRoot };
export { MODAL_TYPE } from './types';

// flow types
export type {
  ConfirmationModalType,
  StandardModalType,
  ModalTypeProps
} from './types';
export type { ModalState } from './redux/reducer';
