//@flow
import * as React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../ModalLayout';
import type { ModalLayoutProps } from '../ModalLayout';

export type StandardModalOwnProps = {
  Header: React.Node,
  Body: React.Node,
  Footer: React.Node
};

export type StandardModalProps = ModalLayoutProps & StandardModalOwnProps;

const StandardModal: React$ComponentType<StandardModalProps> = (
  props: StandardModalProps
) => {
  const { Header, Body, Footer, onClose, ...rest } = props;
  return (
    <ModalLayout onClose={onClose} {...rest}>
      <div className="modal-header">
        {Header}
        <button type="button" className="close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">{Body}</div>
      <div className="modal-footer">{Footer}</div>
    </ModalLayout>
  );
};

StandardModal.propTypes = {
  Header: PropTypes.node,
  Body: PropTypes.node,
  Footer: PropTypes.node
};

export default StandardModal;
