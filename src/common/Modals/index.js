// @flow
import modalsReducer, {
  showModal,
  hideModal,
  getModals
} from './redux/reducer';
import ConfirmationModal from './Types/ConfirmationModal';
import StandardModal from './Types/StandardModal';
import ModalRoot from './ModalRoot';

export const actions = { showModal, hideModal };
export const selectors = { getModals };
export const reducer = modalsReducer;

export { ConfirmationModal };
export { StandardModal };
export { ModalRoot };

export { MODAL_TYPE } from './types';

// flow types
export type {
  ConfirmationModalType,
  StandardModalType,
  ModalTypeProps
} from './types';
export type { ModalState } from './redux/reducer';
