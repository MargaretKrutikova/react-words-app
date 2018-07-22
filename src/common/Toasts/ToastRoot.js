// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToasts, hideToast } from './redux/reducer';
import type { Toast as ToastType } from './redux/reducer';
import type { GlobalState } from 'Reducers/';
import Toast from './Toast';

type ToastRootType = {
  toasts: Array<ToastType>,
  hideToast: (id: string) => void
};

const ToastRoot = ({ toasts, hideToast }: ToastRootType) => {
  const renderedToasts = toasts.map((toast: ToastType, ind: number) => (
    <Toast
      key={toast.id}
      {...toast.props}
      position={ind}
      onClose={() => hideToast(toast.id)}
    />
  ));

  return <React.Fragment>{renderedToasts}</React.Fragment>;
};

const mapStateToProps = (state: GlobalState) => ({
  toasts: getToasts(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideToast: (id: string) => dispatch(hideToast(id))
});

ToastRoot.propTypes = {
  toasts: PropTypes.array.isRequired,
  hideToast: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastRoot);
