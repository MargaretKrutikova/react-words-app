import React from 'react';
import PropTypes from 'prop-types';
import StandardModal from './StandardModal';

const ConfirmationModal = ({
  title,
  confirmText,
  confirmButtonText,
  onConfirm,
  onClose,
  ...rest }) => {
  const Header = title ? (
    <h5 className="modal-title">{title}</h5>
  ) : null;

  const Body = (<p>{confirmText}</p>);
  const Footer = (
    <React.Fragment>
      <button type="button" onClick={onConfirm} className="btn btn-primary">{confirmButtonText || 'Confirm'}</button>
      <button type="button" onClick={onClose} className="btn btn-secondary">Close</button>
    </React.Fragment>
  );

  return <StandardModal {...{ Header, Body, Footer }} onClose={onClose} {...rest} />;
}

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  onTransitionComplete: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

export default ConfirmationModal;