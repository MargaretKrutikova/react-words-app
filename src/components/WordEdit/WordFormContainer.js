// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { WordServiceApi, WordTypeFactory } from 'Services/Words';
import type { WordType } from 'Services/Words';
import WordForm from './WordForm';
import { actions as modalActions, MODAL_TYPE } from 'Common/Modals';
import type { ModalTypeProps } from 'Common/Modals';
import { actions as toastActions, TOAST_TYPE } from 'Common/Toasts';
import type { ToastType } from 'Common/Toasts';

// types
type PropsType = {
  showModal: (modalProps: ModalTypeProps) => void,
  showToast: (toastType: ToastType, message: string) => void
};

type StateType = {
  wordId: ?string,
  isError: boolean,
  isLoading: boolean,
  isSaving: boolean,
  word: WordType
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showModal: (modalProps: ModalTypeProps) =>
    dispatch(modalActions.showModal(modalProps)),
  showToast: (toastType: ToastType, message: string) =>
    dispatch(toastActions.showToast(toastType, message))
});

class WordFormContainer extends React.PureComponent<
  PropsType & ContextRouter,
  StateType
> {
  originalWord: WordType;
  state = {
    word: WordTypeFactory.createWord(),
    wordId: undefined,
    isLoading: false,
    isSaving: false,
    isError: false
  };
  async componentDidMount() {
    const { wordId } = this.props.match.params;
    if (!wordId) return;

    // 'edit' mode
    this.setState({ wordId, isLoading: true });

    try {
      const word: WordType = await WordServiceApi.getWord(wordId);
      this.originalWord = word;

      this.setState({ word });
    } catch (_) {
      this.setState({ isError: true });
      this.props.showToast(
        TOAST_TYPE.ERROR,
        'Wooops... An error occured while fetching your word....'
      );
    } finally {
      this.setState({ isLoading: false });
    }
  }
  isEditMode = () => this.state.wordId != undefined;
  saveChanges = async (word: WordType) => {
    this.setState({ isSaving: true });

    try {
      const newWord: WordType = await WordServiceApi.saveWord(word);
      this.setState({
        word: WordTypeFactory.copyWord(newWord),
        wordId: newWord.id
      });

      this.props.showToast(TOAST_TYPE.SUCCESS, 'Saved successfully :)');
    } catch (_) {
      this.props.showToast(
        TOAST_TYPE.ERROR,
        'Wooops... Couldn\'t save the word! Try again and it will work :)'
      );
    } finally {
      this.setState({ isSaving: false });
    }
  };
  cancelChanges = () => {
    if (!this.isEditMode()) {
      this.props.history.push('/list');
      return;
    }
    this.props.showModal({
      type: MODAL_TYPE.CONFIRMATION,
      props: {
        title: 'Revert changes',
        confirmText: 'Are you sure you want to revert made changes?',
        confirmButtonText: 'Yeah',
        onConfirm: () => {
          this.setState({ word: WordTypeFactory.copyWord(this.originalWord) });
        },
        closeOnConfirm: true
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isError ? (
          <h3>Oooops! Some error occured.</h3>
        ) : (
          <WordForm
            word={this.state.word}
            mode={this.isEditMode() ? 'edit' : 'add'}
            save={this.saveChanges}
            isSaving={this.state.isSaving}
            cancel={this.cancelChanges}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(WordFormContainer);
