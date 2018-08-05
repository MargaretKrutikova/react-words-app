import React from 'react';
import { Link } from 'react-router-dom';
import Word from './Word';
import PageHeader from '../Header/PageHeader';
import InfinityIcon from 'Common/Icons/InfinityIcon';
import './_Words.scss';

const Words = (props) => (
  <div className="words-list mb-4">
    <PageHeader>Swedish words</PageHeader>

    {props.loading && (
      <React.Fragment>
        <h4>Loading...</h4>
        <InfinityIcon className="spinner-icon" width={200} height={200} />
      </React.Fragment>
    )}

    {!props.loading &&
      props.words.map((word, index) => (
        <div
          key={index}
          className="d-flex justify-content-between py-3 words-list__item"
        >
          <Word word={word} />
          <Link to={`/edit/${word.id}`}>Edit</Link>
        </div>
      ))}
  </div>
);

export default Words;
