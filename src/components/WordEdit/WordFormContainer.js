import React, { PureComponent } from 'react';
import { WordEntity, WordServiceApi } from 'Services/Words';
import WordForm from './WordForm';

class WordFormContainer extends PureComponent {
  state = {
    word: new WordEntity(),
    wordId: undefined,
    isError: false
  }
  componentDidMount() {
    const wordId = this.props.match.params.wordId;
  
    // 'edit' mode
    if (wordId) {
      WordServiceApi.getWord(wordId)
        .then((wordEntity) => this.setState({ 
          word: wordEntity, 
          wordId: wordEntity.id 
        }))
        .catch(() => {
          this.setState({ word: null, wordId: undefined, isError: true });
        });
    }
  }
  saveChanges = (word) => {
    if (this.state.wordId) {
      WordServiceApi.updateWord(word);
    } else {
      WordServiceApi.createWord(word);
    }
  }
  isEditMode = () => {
    return this.state.wordId != undefined;
  }
  cancelChanges = () => {
    if (this.isEditMode()) {
      this.setState((prevState) => ({ word: new WordEntity(prevState.word) }));
    } else {
      this.props.history && this.props.history.push('/list');
    }
  }
  render() {
    return (
      <React.Fragment>
        { this.state.isError ? 
          (<h3>Oooops! Some error occured.</h3>) : 
          (<WordForm
            word={this.state.word}
            mode={this.isEditMode() ? 'edit' : 'add'}
            save={this.saveChanges}
            cancel={this.cancelChanges}
          />)
        }
      </React.Fragment>);
  }
}

export default WordFormContainer;