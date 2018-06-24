// @flow
import React, { PureComponent } from 'react';
import { WordEntity, WordServiceApi } from 'Services/Words';
import WordForm from './WordForm';

type PropsType = {
  history: { push: (url: string) => void },
  match: { params: any }
};

type StateType = {
  wordId: ?string,
  isError: boolean,
  isSaving: boolean,
  word: WordEntity
};

class WordFormContainer extends PureComponent<PropsType, StateType> {
  originalWord: WordEntity;
  state = {
    word: new WordEntity(),
    wordId: undefined,
    isSaving: false,
    isError: false
  }
  componentDidMount() {
    const wordId = this.props.match.params.wordId;
    this.setState({ wordId });

    // 'edit' mode
    if (wordId) {
      WordServiceApi.getWord(wordId)
        .then((wordEntity: WordEntity) => {
          this.setState({
            word: wordEntity,
            wordId: wordEntity._id
          });
          this.originalWord = wordEntity;
        })
        .catch(() => {
          this.setState({
            wordId: undefined,
            isError: true
          });
        });
    }
  }
  saveChanges = async (word: WordEntity) => {
    this.setState({ isSaving: true });
    await WordServiceApi.saveWord(word);

    this.setState({ isSaving: false });
  }
  isEditMode = () => {
    return this.state.wordId != undefined;
  }
  cancelChanges = () => {
    if (this.isEditMode()) {
      this.setState({ word: new WordEntity(this.originalWord) });
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
            isSaving={this.state.isSaving}
            cancel={this.cancelChanges}
          />)
        }
      </React.Fragment>);
  }
}

export default WordFormContainer;