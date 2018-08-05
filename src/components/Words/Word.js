// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { WordType } from 'Services/Words';
import { WordTypeShape } from 'Services/Words';

// types
type PropsType = {
  word: WordType
};

const Word = (props: PropsType) => {
  const word = props.word;
  const shortProperties = [
    word.translations[0],
    word.explanations[0],
    word.usages[0]
  ]
    .filter((value: string) => value)
    .join(', ');

  return (
    <div>
      <h4>{word.value}</h4>
      <span>{shortProperties}</span>
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.shape(WordTypeShape).isRequired
};

export default Word;
