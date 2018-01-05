import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';

import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Main />
    </React.Fragment>
  </Router>
);

export default App;