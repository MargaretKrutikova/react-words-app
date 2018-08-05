// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router-dom';
import { fetchWords } from 'Reducers/words';
import type { WordsState } from 'Reducers/words';
import type { GlobalState } from 'Reducers/';
import PropTypes from 'prop-types';
import { WordTypeShape } from 'Services/Words';
import { actions as toastActions, TOAST_TYPE } from 'Common/Toasts';
import type { ToastType } from 'Common/Toasts';
import Words from './Words';
import { Paginator } from '../Paginator';

const defaultItemsPerPage = 4;

// types
type PropsType = {
  words: WordsState,
  fetchWords: (page: number, itemsPerPage: number) => Promise<void>,
  showToast: (toastType: ToastType, message: string) => void
};

const mapStateToProps = (state: GlobalState) => ({
  words: state.words
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWords: (page: number, itemsPerPage: number) =>
    dispatch(fetchWords(page, itemsPerPage)),
  showToast: (toastType: ToastType, message: string) =>
    dispatch(toastActions.showToast(toastType, message))
});

class WordsContainer extends React.Component<PropsType & ContextRouter, void> {
  componentDidMount() {
    const page = +this.props.match.params.page || 1;
    this.getPaginatedWords(page);
  }
  componentDidUpdate(prevProps: PropsType) {
    const { history, words } = this.props;
    if (words.currentPage !== prevProps.words.currentPage && history) {
      history.push(`/list/page/${words.currentPage}`);
    }
  }
  shouldComponentUpdate(nextProps: PropsType) {
    return this.props.words !== nextProps.words;
  }
  getPaginatedWords = (page: number) => {
    this.props.fetchWords(page, defaultItemsPerPage).catch(() => {
      this.props.showToast(
        TOAST_TYPE.ERROR,
        'Wooops... An error occured while fetching words....'
      );
    });
  };
  render() {
    let { items, total, currentPage, itemsPerPage, loading } = this.props.words;

    return (
      <React.Fragment>
        <Words words={items} loading={loading} />
        <Paginator
          onPageChange={this.getPaginatedWords}
          totalItems={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

WordsContainer.propTypes = {
  words: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape(WordTypeShape)),
    total: PropTypes.number
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordsContainer);
