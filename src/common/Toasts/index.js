// @flow
import toastsReducer, {
  showToast,
  hideToast,
  getToasts,
  TOAST_TYPE
} from './redux/reducer';
import ToastRoot from './ToastRoot';

export const actions = { showToast, hideToast };
export const selectors = { getToasts };
export const reducer = toastsReducer;

export { ToastRoot };
export { TOAST_TYPE };

// flow types
export type { ToastType, ToastState } from './redux/reducer';
