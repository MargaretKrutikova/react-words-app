import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getModals, hideModal, removeModal } from '../../reducers/modals';
import ConfirmationModal from './Types/ConfirmationModal';

const ModalRoot = ({ modals, hideModal, removeModal }) => {
  const renderedModals = modals.map((modal) => (
    <ConfirmationModal
      key={modal.id}
      {...modal.props}
      isOpen={modal.isOpen}
      onTransitionExited={() => removeModal(modal.id)}
      onClose={() => hideModal(modal.id)}
    />
  ));

  return (<React.Fragment>{renderedModals}</React.Fragment>);
}

const mapStateToProps = (state) => ({
  modals: getModals(state)
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: (id) => dispatch(hideModal(id)),
  removeModal: (id) => dispatch(removeModal(id))
});

ModalRoot.propTypes = {
  modals: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);