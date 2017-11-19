import React from 'react';
import WordsContainer from './words/WordsContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <h1>Word list</h1>
        <p>Swedish words are here</p>
        <WordsContainer />
      </div> 
    );
  }
}

export default App;