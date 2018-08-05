// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import './_Toast.scss';

const AUTO_CLOSE_TIMEOUT = 5000;
const TOAST_DISTANCE = 60;

// types
type ToastState = {
  isOpen: boolean
};
type ToastProps = {
  message: string,
  type: string,
  position: number,
  onClose: () => void
};

class Toast extends React.Component<ToastProps, ToastState> {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
  };
  autoCloseTimeout: TimeoutID;
  state = {
    isOpen: false
  };
  componentDidMount() {
    this.setState({ isOpen: true });

    this.autoCloseTimeout = setTimeout(() => {
      this.setState({ isOpen: false });
    }, AUTO_CLOSE_TIMEOUT);
  }
  componentWillUnmount() {
    this.clearTimeout();
  }
  onTransitionExited = () => {
    this.props.onClose();
  };
  clearTimeout = () => {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  };
  dismiss = () => {
    this.setState({ isOpen: false });
    this.clearTimeout();
  };
  calculateToastTop = () => TOAST_DISTANCE * (this.props.position + 1);
  render() {
    const { message, type } = this.props;

    return (
      <CSSTransition
        in={this.state.isOpen}
        unmountOnExit
        classNames="toast"
        timeout={350}
        onExited={this.props.onClose}
      >
        <Portal>
          <div
            className={`alert alert-${type} toast`}
            style={{ top: this.calculateToastTop() }}
            onClick={this.dismiss}
          >
            {message}
          </div>
        </Portal>
      </CSSTransition>
    );
  }
}

export default Toast;
