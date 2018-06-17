import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import './_Modal.scss';

const KEYCODES = {
  ESCAPE: 27
};

class ModalLayout extends React.Component {
  // used in detecting clicks outside modal
  modalNode = null;
  // used in css transition
  state = {
    transitionIn: false
  }
  componentDidMount() {
    this.setState({ transitionIn: true });
    document.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
  closeOnOverlayClick = (event) => {
    if (!this.modalNode || this.modalNode.contains(event.target)) {
      return;
    }
    this.props.onClose();
  }
  handleKeydown = (event) => {
    if (event.key === 'Escape' || event.keyCode === KEYCODES.ESCAPE) {
      this.props.onClose();
    }
  }
  shouldAnimate = (animationState) => {
    return animationState === 'entering' || animationState === 'entered';
  }

  render() {
    const { isOpen, onClose, onTransitionExited } = this.props;
    const { transitionIn } = this.state;

    return (
      <CSSTransition
        in={transitionIn && isOpen}
        unmountOnExit
        classNames="modal"
        timeout={150}
        onExited={onTransitionExited}
      >
        {(state) =>
          (<Portal>
            <div className="modal" style={{ display: 'block' }} onClick={this.closeOnOverlayClick}>
              <CSSTransition
                in={this.shouldAnimate(state)}
                unmountOnExit
                classNames="modal-dialog"
                timeout={300}
              >
                <div className="modal-dialog">
                  <div className="modal-content" ref={(node) => { this.modalNode = node; }}>
                    {this.props.children}
                  </div>
                </div>
              </CSSTransition>
            </div>

            <CSSTransition
              in={this.shouldAnimate(state)}
              unmountOnExit
              classNames="modal-overlay"
              timeout={150}
            >
              <div className="modal-backdrop" onClick={onClose}></div>
            </CSSTransition>
          </Portal>
          )}
      </CSSTransition>
    );
  }
}

ModalLayout.defaultProps = {
  onClose: () => { },
  onTransitionExited: () => { }
}

ModalLayout.propTypes = {
  onClose: PropTypes.func,
  onTransitionComplete: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

export default ModalLayout;