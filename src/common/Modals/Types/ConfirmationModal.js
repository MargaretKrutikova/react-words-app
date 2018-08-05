//@flow
import * as React from 'react';
import PropTypes from 'prop-types';
import StandardModal from './StandardModal';
import type { ModalLayoutProps } from '../ModalLayout';

export type ConfirmationModalOwnProps = {
  title: string,
  confirmText: string,
  confirmButtonText: string,
  onConfirm: () => void,
  closeOnConfirm?: boolean
};

export type ConfirmationModalProps = ModalLayoutProps &
  ConfirmationModalOwnProps;

const ConfirmationModal: React$ComponentType<ConfirmationModalProps> = (
  props: ConfirmationModalProps
) => {
  const {
    title,
    confirmText,
    confirmButtonText,
    onConfirm,
    closeOnConfirm,
    onClose,
    ...rest
  } = props;

  const handleConfirm = () => {
    onConfirm();
    closeOnConfirm && onClose();
  };
  const Header = title ? <h5 className="modal-title">{title}</h5> : null;

  const Body = <p>{confirmText}</p>;
  const Footer = (
    <React.Fragment>
      <button type="button" onClick={handleConfirm} className="btn btn-primary">
        {confirmButtonText || 'Confirm'}
      </button>
      <button type="button" onClick={onClose} className="btn btn-secondary">
        Close
      </button>
    </React.Fragment>
  );

  return (
    <StandardModal {...{ Header, Body, Footer }} onClose={onClose} {...rest} />
  );
};

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string,
  onConfirm: PropTypes.func,
  closeOnConfirm: PropTypes.bool
};

export default ConfirmationModal;
