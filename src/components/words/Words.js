import React, { PureComponent } from 'react';
import Word from './Word';

const wordsStyles = {
  padding: '30px 0'
};

class Words extends PureComponent {
  render() {
    return (
      <div style={wordsStyles}>
        {this.props.words.map((word, index) => <Word key={index} word={word} />)}
      </div>
    );
  }
}

export default Words;