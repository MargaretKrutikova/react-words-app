import React from 'react';

import { Route } from 'react-router-dom';
import WordsContainer from '../Words/WordsContainer';
import WordFormContainer from '../WordEdit/WordFormContainer';

const Main = () => (
  <main className="container">
    <div className='row'>
      <section className="col-xs-12 col-sm-12 col-md-6">
        <Route exact path='/' component={WordsContainer} />
        <Route path='/list/(page/:page)?' component={WordsContainer} />
      </section>

      {['/add', '/edit/:wordId'].map((path, ind) =>
        <Route key={ind} path={path} component={(props) => (
          <section className="col-xs-12 col-sm-12 col-md-12">
            <WordFormContainer {...props} />
          </section>
        )} />
      )}
    </div>
  </main>
);

export default Main;