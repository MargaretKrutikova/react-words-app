/* @flow */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getModals, hideModal, removeModal } from 'Reducers/modals';
import ConfirmationModal from './Types/ConfirmationModal';
import StandardModal from './Types/StandardModal';
import { MODAL_TYPE } from './types';
import type { Modal } from './types';
import type { GlobalState } from 'Reducers/';

// types
type ModalRootProps = {
  modals: Array<Modal>,
  hideModal: (id: string) => void,
  removeModal: (id: string) => void
};
type ModalMappingKey = $Keys<typeof MODAL_TYPE>;

type ModalMapping = {
  [key: ModalMappingKey]: React$ComponentType<any>
};

const MODAL_MAPPING: ModalMapping = {
  [MODAL_TYPE.CONFIRMATION]: ConfirmationModal,
  [MODAL_TYPE.STANDARD]: StandardModal
};

const ModalRoot = ({ modals, hideModal, removeModal }: ModalRootProps) => {
  const renderedModals = modals.map((modal: Modal) => {
    const { props, type } = modal.modalProps;
    const ModalComponent = MODAL_MAPPING[type];

    return ModalComponent ? (
      <ModalComponent
        {...props}
        key={modal.id}
        isOpen={modal.isOpen}
        onTransitionExited={() => removeModal(modal.id)}
        onClose={() => hideModal(modal.id)}
      />
    ) : null;
  });

  return <React.Fragment>{renderedModals}</React.Fragment>;
};

const mapStateToProps = (state: GlobalState) => ({
  modals: getModals(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideModal: (id: string) => dispatch(hideModal(id)),
  removeModal: (id: string) => dispatch(removeModal(id))
});

ModalRoot.propTypes = {
  modals: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRoot);
