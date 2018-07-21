//@flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import './_Modal.scss';
import type { TransitionStatus } from 'react-transition-group';

// types
type ModalLayoutState = {
  transitionIn: boolean
};

export type ModalLayoutProps = {
  isOpen: boolean,
  onClose: () => void,
  onTransitionExited: () => void
};

type ModalLayoutOwnProps = ModalLayoutProps & {
  children: React.Node
};

const KEYCODES = {
  ESCAPE: 27
};

class ModalLayout extends React.Component<
  ModalLayoutOwnProps,
  ModalLayoutState
> {
  defaultProps = {
    onClose: () => {},
    onTransitionExited: () => {}
  };

  // used in detecting clicks outside modal
  modalNode: ?HTMLDivElement = undefined;
  // used in css transition
  state = {
    transitionIn: false
  };
  componentDidMount() {
    this.setState({ transitionIn: true });
    document.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
  closeOnOverlayClick = (event: SyntheticInputEvent<EventTarget>) => {
    if (!this.modalNode || this.modalNode.contains(event.target)) {
      return;
    }
    this.props.onClose();
  };
  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.keyCode === KEYCODES.ESCAPE) {
      this.props.onClose();
    }
  };
  shouldAnimate = (animationState: string) => {
    return animationState === 'entering' || animationState === 'entered';
  };

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
        {(state: TransitionStatus) => (
          <Portal>
            <div
              className="modal"
              style={{ display: 'block' }}
              onClick={this.closeOnOverlayClick}
            >
              <CSSTransition
                in={this.shouldAnimate(state)}
                unmountOnExit
                classNames="modal-dialog"
                timeout={300}
              >
                <div className="modal-dialog">
                  <div
                    className="modal-content"
                    ref={(node: ?HTMLDivElement) => {
                      this.modalNode = node;
                    }}
                  >
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
              <div className="modal-backdrop" onClick={onClose} />
            </CSSTransition>
          </Portal>
        )}
      </CSSTransition>
    );
  }
}

ModalLayout.propTypes = {
  onClose: PropTypes.func,
  onTransitionExited: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default ModalLayout;
