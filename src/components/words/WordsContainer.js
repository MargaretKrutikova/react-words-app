import React, { PureComponent } from 'react';
import { WordServiceApi } from 'Services/Words';
import Words from './Words';
import { Paginator } from '../Paginator';
import Aux from '../AuxComponent/AuxComponent';

class WordsContainer extends PureComponent {
  itemsPerPage = 4;
  state = { 
    words: [],
    totalItems: 0,
    initialPage: 1
  };
  componentDidMount() {
    this.getPaginatedWords(this.state.initialPage);
  }
  getPaginatedWords = (page) => {
    WordServiceApi.getWords(page, this.itemsPerPage).then((data) => {
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
        <Paginator
          onPageChange={this.getPaginatedWords} 
          totalItems={totalItems}
          itemsPerPage={this.itemsPerPage}
          initialPage={initialPage}/>
      </Aux>
    );
  }
}

export default WordsContainer;