import React, { PureComponent } from 'react';
import WordService from './WordService';
import Words from './Words';
import PaginatorContainer from '../common/paginator/PaginatorContainer';
import Aux from '../common/AuxComponent';

class WordsContainer extends PureComponent {
  itemsPerPage = 3;
  state = { 
    words: [],
    totalItems: 0,
    initialPage: 1
  };
  componentDidMount() {
    this.getPaginatedWords(this.state.initialPage);
  }
  getPaginatedWords = (page) => {
    WordService.getWords(page, this.itemsPerPage).then((data) => {
      this.setState({ 
        words: data.words, 
        totalItems: data.totalItems
      });
    });
  }
  
  render() {
    let { words, totalItems, initialPage } = this.state;
    return (
      <Aux>
        <Words words={words}/>
        <PaginatorContainer onPageChange={this.getPaginatedWords} 
          totalItems={totalItems}
          itemsPerPage={this.itemsPerPage}
          initialPage={initialPage}/>
      </Aux>
    );
  }
}

export default WordsContainer;