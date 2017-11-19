import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordEntity from './WordEntity';

class Word extends Component {
  render() {
    return (
      <div>
        {this.props.word.value}
      </div>
    );
  }
}

Word.propTypes = {
  word: PropTypes.instanceOf(WordEntity)
};

export default Word;