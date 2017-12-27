import React from 'react';

import { Route, } from 'react-router-dom';
import WordsContainer from '../Words/WordsContainer';
import WordFormContainer from '../WordEdit/WordFormContainer';

const mainContentStyles = {
  marginTop: '50px'
};

const Main = () => (
  <main className="row" style={mainContentStyles}>
    <section className="col-xs-12 col-sm-12 col-md-6">
      <Route exact path='/' component={WordsContainer}/>
      <Route path='/list' component={WordsContainer}/>
    </section>

    {['/add', '/edit/:wordId'].map((path, ind) => 
      <Route key={ind} path={path} component={(props) => (
        <section className="col-xs-12 col-sm-12 col-md-10">
          <WordFormContainer {...props} />
        </section>
      )} />
    )}
  </main>
);

export default Main;