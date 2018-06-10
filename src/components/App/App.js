import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from '../Main/Main';
import Header from '../Header/Header';
import configureStore from '../../store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Main />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>
);

export default App;