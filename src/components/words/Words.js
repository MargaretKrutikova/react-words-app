import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Word from './Word';
import PageHeader from '../Header/PageHeader';
import './_Words.scss';

class Words extends PureComponent {
  render() {
    return (
      <div className='words-list mb-4'>
        <PageHeader>Swedish words</PageHeader>

        { this.props.words.map((word, index) => (
          <div key={index} className='d-flex justify-content-between py-3 words-list__item'>
            <Word word={word} />
            <Link to={`/edit/${word.id}`}>
                Edit
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Words;