// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Portal } from 'react-portal';
import './_Toast.scss';

const AUTO_CLOSE = 20000;
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
  autoCloseTimeout = undefined;
  state = {
    isOpen: false
  };
  componentDidMount() {
    this.setState({ isOpen: true });
    //this.autoCloseTimeout = setTimeout(() => {
    //  this.setState({ isOpen: false });
    //}, AUTO_CLOSE);
  }
  onTransitionExited = () => {
    this.props.onClose();
  };
  dismiss = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { message, type, position } = this.props;

    return (
      <CSSTransition
        in={this.state.isOpen}
        unmountOnExit
        classNames="toast"
        timeout={350}
        onExited={this.props.onClose}
      >
        {(state: string) => (
          <Portal>
            <div
              className=" alert alert-success toast"
              style={{ top: TOAST_DISTANCE * (position + 1) }}
              onClick={this.dismiss}
            >
              {message}
            </div>
          </Portal>
        )}
      </CSSTransition>
    );
  }
}

export default Toast;
