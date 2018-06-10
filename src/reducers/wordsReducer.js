import { WordServiceApi } from '../services/Words';

// Actions
const REQUEST_WORDS = 'REQUEST_WORDS';
const REQUEST_WORDS_SUCCESS = 'REQUEST_WORDSS_SUCCESS';
const REQUEST_WORDS_FAILURE = 'REQUEST_WORDS_FAILURE';

// initial state
const initialState = {
  currentPage: 1,
  pageToLoad: undefined,
  loading: false,
  total: 1,
  itemsPerPage: undefined,
  error: null,
  items: []
};

// Action creators
const actions = {
  requestWords: (page, itemsPerPage) => ({
    type: REQUEST_WORDS,
    payload: { pageToLoad: page, itemsPerPage, currentPage: page }
  }),
  requestWordsSuccess: (items, total, page) => ({
    type: REQUEST_WORDS_SUCCESS,
    payload: { currentPage: page, total, pageToLoad: undefined, items }
  }),
  requestWordsFailure: (error) => ({
    type: REQUEST_WORDS_FAILURE,
    payload: { error }
  })
};


// Async action creator
export const fetchWords = function (page, itemsPerPage) {
  return function (dispatch) {
    dispatch(actions.requestWords(page, itemsPerPage));

    return WordServiceApi.getWords(page, itemsPerPage).then(
      (data) => dispatch(actions.requestWordsSuccess(data.items, data.total, page)),
      (error) => dispatch(actions.requestWordsFailure(error))
    );
  };
};


const words = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_WORDS:
      return { ...state, ...{ loading: true, error: null }, ...action.payload };

    case REQUEST_WORDS_SUCCESS:
    case REQUEST_WORDS_FAILURE:
      return { ...state, ...{ loading: false }, ...action.payload };

    default:
      return state;
  }
};

export default words;