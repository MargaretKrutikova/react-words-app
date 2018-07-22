// @flow
import shortId from 'shortid';
import type { GlobalState } from 'Reducers/';

// flow types
type ToastProps = { type: string, message: string };
export type Toast = { id: string, props: ToastProps };

export type ToastState = Array<Toast>;

type ShowToastAction = { type: typeof SHOW_TOAST, toast: Toast };
type HideToastAction = { type: typeof HIDE_TOAST, id: string };

type ToastAction = ShowToastAction | HideToastAction;

// Action types
const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

// Initial state
const initialState: ToastState = [];

// Action creators
export const showToast = (
  toastType: string,
  message: string
): ShowToastAction => ({
  type: SHOW_TOAST,
  toast: {
    id: shortId.generate(),
    props: {
      type: toastType,
      message: message
    }
  }
});

export const hideToast = (id: string): HideToastAction => ({
  type: HIDE_TOAST,
  id
});

// Reducer
const reducer = (
  state: Array<Toast> = initialState,
  action: ToastAction
): Array<Toast> => {
  switch (action.type) {
    case SHOW_TOAST:
      return state.concat(action.toast);

    case HIDE_TOAST: {
      const actionId = action.id;
      return state.filter((toast: Toast) => toast.id !== actionId);
    }
    default:
      return state;
  }
};

// Selectors
export const getToasts = (state: GlobalState) => state.toasts;

export default reducer;
