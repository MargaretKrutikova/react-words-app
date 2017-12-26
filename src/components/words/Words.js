import React, { PureComponent } from 'react';
import Word from './Word';
import PageHeader from '../Header/PageHeader';

class Words extends PureComponent {
  render() {
    return (
      <div>
        <PageHeader>List with words</PageHeader>

        {this.props.words.map((word, index) => <Word key={index} word={word} />)}
      </div>
    );
  }
}

export default Words;