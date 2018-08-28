//@flow
import { WordServiceApi } from '../services/Words';
import type { WordType, PaginatedWords } from 'Services/Words';

export type WordsState = {
  currentPage: number,
  pageToLoad: ?number,
  loading: boolean,
  total: number,
  itemsPerPage?: number,
  error: ?Error,
  items: Array<WordType>
};

// Actions
const REQUEST_WORDS = 'REQUEST_WORDS';
const REQUEST_WORDS_SUCCESS = 'REQUEST_WORDSS_SUCCESS';
const REQUEST_WORDS_FAILURE = 'REQUEST_WORDS_FAILURE';

// initial state
const initialState: WordsState = {
  currentPage: 1,
  pageToLoad: undefined,
  loading: false,
  total: 1,
  itemsPerPage: undefined,
  error: null,
  items: []
};

type RequestWordsAction = {
  type: typeof REQUEST_WORDS,
  pageToLoad: number,
  itemsPerPage: number
};
type RequestWordsSuccessAction = {
  type: typeof REQUEST_WORDS_SUCCESS,
  currentPage: number,
  total: number,
  items: Array<WordType>
};
type RequestWordsFailureAction = {
  type: typeof REQUEST_WORDS_FAILURE,
  error: Error
};

type WordsAction =
  | RequestWordsAction
  | RequestWordsSuccessAction
  | RequestWordsFailureAction;

// Action creators
const actions = {
  requestWords: (page: number, itemsPerPage: number): RequestWordsAction => ({
    type: REQUEST_WORDS,
    pageToLoad: page,
    itemsPerPage
  }),
  requestWordsSuccess: (
    items: Array<WordType>,
    total: number,
    page: number
  ): RequestWordsSuccessAction => ({
    type: REQUEST_WORDS_SUCCESS,
    currentPage: page,
    total,
    items
  }),
  requestWordsFailure: (error: Error) => ({
    type: REQUEST_WORDS_FAILURE,
    error
  })
};

// Async action creator
export const fetchWords = (page: number, itemsPerPage: number) => {
  return function(dispatch: Dispatch) {
    dispatch(actions.requestWords(page, itemsPerPage));

    return WordServiceApi.getWords(page, itemsPerPage)
      .then((data: PaginatedWords) =>
        dispatch(actions.requestWordsSuccess(data.items, data.total, page))
      )
      .catch((error: Error) => {
        dispatch(actions.requestWordsFailure(error));
        throw error;
      });
  };
};

const reducer = (state: WordsState = initialState, action: WordsAction) => {
  switch (action.type) {
    case REQUEST_WORDS: {
      const { pageToLoad, itemsPerPage } = action;
      return {
        ...state,
        loading: true,
        error: null,
        pageToLoad,
        itemsPerPage,
        currentPage: pageToLoad
      };
    }
    case REQUEST_WORDS_SUCCESS: {
      const { currentPage, total, items } = action;
      return {
        ...state,
        loading: false,
        pageToLoad: undefined,
        currentPage,
        total,
        items
      };
    }
    case REQUEST_WORDS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default reducer;
