import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';

import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Router>
    <div className="App container">
      <Header />
      <Main />
    </div>
  </Router>
);

export default App;