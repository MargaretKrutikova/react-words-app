// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import type { WordType } from 'Services/Words';
import { WordTypeFactory, WordTypeShape } from 'Services/Words';
import ListViewEdit from '../ListViewEdit/ListViewEdit';
import PageHeader from '../Header/PageHeader';
import ProgressButton from 'Common/Buttons/ProgressButton';
import './_WordForm.scss';

// types
type PropsType = {
  word: WordType,
  save: (word: WordType) => Promise<void>,
  cancel: () => void,
  isSaving: boolean,
  mode: 'add' | 'edit'
};

type StateType = {
  word: WordType,
  lastWord: ?WordType
};

class WordForm extends PureComponent<PropsType, StateType> {
  state = {
    word: WordTypeFactory.createWord(),
    lastWord: undefined
  };
  static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
    if (nextProps.word !== prevState.lastWord) {
      return {
        word: WordTypeFactory.copyWord(nextProps.word),
        lastWord: nextProps.word
      };
    }
    return null;
  }
  onWordValueChanged = (event: SyntheticInputEvent<EventTarget>) => {
    const newValue = event.target.value;
    this.onWordPropertyChanged('value', newValue);
  };
  onWordPropertyChanged = (propertyName: string, propertyValue: string) => {
    this.setState((prevState: StateType) => ({
      word: { ...prevState.word, ...{ [propertyName]: propertyValue } }
    }));
  };
  saveWord = () => {
    this.props.save(this.state.word);
  };
  render() {
    const isEditingMode = this.props.mode === 'edit';
    return (
      <div
        className="px-3 my-4 mr-auto border rounded bg-light word-form"
        id="word-form"
      >
        <PageHeader>{isEditingMode ? 'Edit word' : 'Add word'}</PageHeader>

        <div className="input-group form-group mb-4">
          <input
            type="text"
            className="form-control"
            id="value"
            value={this.state.word.value}
            placeholder="Enter word"
            onChange={this.onWordValueChanged}
          />
        </div>
        <hr />
        <div>
          <ListViewEdit
            title="Translations"
            placeholder="Translate word"
            list={this.props.word.translations}
            onChange={this.onWordPropertyChanged.bind(this, 'translations')}
          />

          <ListViewEdit
            title="Explanations"
            placeholder="Explain word"
            list={this.props.word.explanations}
            onChange={this.onWordPropertyChanged.bind(this, 'explanations')}
          />

          <ListViewEdit
            title="Usages"
            placeholder="Use in a phrase/sentence"
            list={this.props.word.usages}
            onChange={this.onWordPropertyChanged.bind(this, 'usages')}
          />
        </div>
        <div className="mb-4 mt-2 d-flex">
          <ProgressButton
            isLoading={this.props.isSaving}
            className="btn btn-default btn-primary mr-4"
            style={{ width: 60 }}
            onClick={() => this.saveWord()}
          >
            Save
          </ProgressButton>
          <button
            className="btn btn-default btn-danger"
            onClick={this.props.cancel}
          >
            {isEditingMode ? 'Revert' : 'Cancel'}
          </button>
        </div>
      </div>
    );
  }
}

WordForm.propTypes = {
  word: PropTypes.shape(WordTypeShape).isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired
};

export default WordForm;
