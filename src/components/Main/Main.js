import React from 'react';

import { Route, } from 'react-router-dom';
import WordsContainer from '../Words/WordsContainer';

const mainContentStyles = {
  marginTop: '50px'
};

const Main = () => (
  <main className="row" style={mainContentStyles}>
    <section className="col-xs-12 col-sm-12 col-md-6">
      <Route exact path='/' component={WordsContainer}/>
      <Route path='/list' component={WordsContainer}/>
    </section>
  </main>
);

export default Main;