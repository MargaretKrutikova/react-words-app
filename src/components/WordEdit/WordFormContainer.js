// @flow
import React, { PureComponent } from 'react';
import { WordEntity, WordServiceApi } from 'Services/Words';
import WordForm from './WordForm';

type Props = {
  history: { push: (url: string) => void },
  match: { params: any }
}

type State = {
  wordId: ?string,
  isError: boolean,
  word: WordEntity
}

class WordFormContainer extends PureComponent<Props, State> {
  state = {
    word: new WordEntity(),
    wordId: undefined,
    isError: false
  }
  componentDidMount() {
    const wordId = this.props.match.params.wordId;
    this.setState({ wordId });

    // 'edit' mode
    if (wordId) {
      WordServiceApi.getWord(wordId)
        .then((wordEntity) => this.setState({
          word: wordEntity,
          wordId: wordEntity._id
        }))
        .catch(() => {
          this.setState({
            word: new WordEntity(),
            wordId: undefined,
            isError: true
          });
        });
    }
  }
  saveChanges = (word: WordEntity) => {
    WordServiceApi.saveWord(word);
  }
  isEditMode = () => {
    return this.state.wordId != undefined;
  }
  cancelChanges = () => {
    if (this.isEditMode()) {
      this.setState((prevState) => ({ word: new WordEntity(prevState.word) }));
    } else {
      this.props.history.push('/list');
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isError ?
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