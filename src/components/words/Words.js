import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Word from './Word';
import PageHeader from '../Header/PageHeader';

class Words extends PureComponent {
  render() {
    return (
      <div>
        <PageHeader>List with words</PageHeader>

        { this.props.words.map((word, index) => (
          <div key={index}>
            <Word  word={word} />
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