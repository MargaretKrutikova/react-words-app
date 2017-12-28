import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Aux from '../AuxComponent/AuxComponent';

import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Router>
    <Aux>
      <Header />
      <Main />
    </Aux>
  </Router>
);

export default App;