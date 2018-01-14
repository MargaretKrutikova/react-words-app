import React from 'react';
import PropTypes from 'prop-types';
import { WordEntity } from 'Services/Words';

const Word = (props) => {
  const word = props.word;
  const shortProperties = [word.translations[0], word.explanations[0], word.usages[0]]
    .filter((value) => value)
    .join(', ');

  return (
    <div>
      <h4>{word.value}</h4>
      <span>{shortProperties}</span>
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.instanceOf(WordEntity)
};

export default Word;