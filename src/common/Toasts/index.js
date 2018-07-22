// @flow
import toastsReducer, {
  showToast,
  hideToast,
  getToasts
} from './redux/reducer';
import ToastRoot from './ToastRoot';

export const actions = { showToast, hideToast };
export const selectors = { getToasts };
export const reducer = toastsReducer;

export { ToastRoot };

// flow types
export type { Toast as ToastType } from './redux/reducer';
export type { ToastState } from './redux/reducer';
