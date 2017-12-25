import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordEntity } from 'Services/Words';

const wordStyles = {
  cursor: 'pointer',
  borderTop: '1px solid rgba(200, 200, 200, 0.6)'
};

class Word extends Component {
  render() {
    const word = this.props.word;
    const shortProperties = [word.translations[0], word.explanations[0], word.usages[0]]
      .filter((value) => value)
      .join(', ');
    return (
      <div style={wordStyles}>
        <h3>{word.value}</h3>
        <p>{shortProperties}</p>
      </div>
    );
  }
}

Word.propTypes = {
  word: PropTypes.instanceOf(WordEntity)
};

export default Word;