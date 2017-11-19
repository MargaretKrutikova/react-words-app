import React, { Component } from 'react';
import WordService from './WordService';
import Words from './Words';

class WordsContainer extends Component {
  state = { words: [] };
  componentDidMount() {
    WordService.getWords().then((words) => {
      this.setState({ words: words});
    });
  }
  
  render() {
    return (
      <Words words={this.state.words}/>
    );
  }
}

export default WordsContainer;