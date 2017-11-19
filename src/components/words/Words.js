import React, { Component } from 'react';
import Word from './Word';

class Words extends Component {
  render() {
    return (
      <div>
        {this.props.words.map((word, index) => <Word key={index} word={word} />)}
      </div>
    );
  }
}

export default Words;