import React from 'react';
import { connect } from 'react-redux';
import { fetchWords } from '../../reducers/wordsReducer';

import Words from './Words';
import { Paginator } from '../Paginator';

const defaultItemsPerPage = 4;

class WordsContainer extends React.Component {
  componentDidMount() {
    const page = +this.props.match.params.page || 1;
    this.getPaginatedWords(page);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.words !== nextProps.words;
  }
  getPaginatedWords = (page) => {
    return this.props.fetchWords(page, defaultItemsPerPage);
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.words != nextProps.words) {
      const { history, words } = this.props;

      if (words.currentPage !== nextProps.words.currentPage && history) {
        this.props.history.push(`/list/page/${nextProps.words.currentPage}`);
      }
    }
  }
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

const mapStateToProps = (state) => ({
  words: state.words
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWords: (page, itemsPerPage) => dispatch(fetchWords(page, itemsPerPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsContainer);
