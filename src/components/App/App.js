import React from 'react';
import WordsContainer from '../Words/WordsContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <h1 className="col-xs-12">Word list</h1>

        <div className="col-xs-12 col-sm-12 col-md-6" >
          <WordsContainer />
        </div>
      </div> 
    );
  }
}

export default App;