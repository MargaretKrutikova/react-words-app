//@flow
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Word from './Word';
import { WordTypeShape } from 'Services/Words';
import type { WordType } from 'Services/Words';
import PageHeader from '../Header/PageHeader';
import InfinityIcon from 'Common/Icons/InfinityIcon';
import './_Words.scss';

// types
type PropsType = {
  words: Array<WordType>,
  loading: boolean
};

const Words = (props: PropsType) => (
  <div className="words-list mb-4">
    <PageHeader>Swedish words</PageHeader>
    {props.loading && (
      <React.Fragment>
        <h4>Loading...</h4>
        <InfinityIcon className="spinner-icon" width={200} height={200} />
      </React.Fragment>
    )}

    {!props.loading &&
      props.words.map((word: WordType, index: number) => (
        <div
          key={index}
          className="d-flex justify-content-between py-3 words-list__item"
        >
          <Word word={word} />
          {word.id != null && <Link to={`/edit/${word.id}`}>Edit</Link>}
        </div>
      ))}
  </div>
);

Words.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape(WordTypeShape)),
  loading: PropTypes.bool
};

export default Words;
