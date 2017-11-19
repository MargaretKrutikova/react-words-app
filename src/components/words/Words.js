import React, { PureComponent } from 'react';
import Word from './Word';

class Words extends PureComponent {
  render() {
    return (
      <div>
        {this.props.words.map((word, index) => <Word key={index} word={word} />)}
      </div>
    );
  }
}

export default Words;