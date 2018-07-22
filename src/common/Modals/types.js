// @flow
import type { ConfirmationModalOwnProps } from './Types/ConfirmationModal';
import type { StandardModalOwnProps } from './Types/StandardModal';

export const MODAL_TYPE = Object.freeze({
  INFORMATION: 'INFORMATION',
  CONFIRMATION: 'CONFIRMATION',
  STANDARD: 'STANDARD'
});

export type ModalTypeProps = ConfirmationModalType | StandardModalType;

type ModalBase = {
  id: string,
  isOpen: boolean
};

export type Modal = ModalBase & {
  modalProps: ModalTypeProps
};

export type ConfirmationModalType = {
  type: typeof MODAL_TYPE.CONFIRMATION,
  props: ConfirmationModalOwnProps
};

export type StandardModalType = {
  type: typeof MODAL_TYPE.STANDARD,
  props: StandardModalOwnProps
};
