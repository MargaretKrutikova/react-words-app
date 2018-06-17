import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../ModalLayout';

const StandardModal = ({ Header, Body, Footer, onClose, ...rest }) => (
  <ModalLayout onClose={onClose} {...rest}>
    <div className="modal-header">
      {Header}
      <button type="button" className="close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      {Body}
    </div>
    <div className="modal-footer">
      {Footer}
    </div>
  </ModalLayout>
);

StandardModal.propTypes = {
  Header: PropTypes.node,
  Body: PropTypes.node,
  Footer: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

export default StandardModal;