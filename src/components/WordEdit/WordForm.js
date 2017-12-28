import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WordEntity } from 'Services/Words';
import ListViewEdit from '../ListViewEdit/ListViewEdit';
import PageHeader from '../Header/PageHeader';
import './_WordForm.scss';

class WordForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      word: new WordEntity(props.word)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      word: new WordEntity(nextProps.word)
    });
  }
  onWordValueChanged = (event) => {
    const newValue = event.target.value;
    this.onWordPropertyChanged('value', newValue);
  }
  onWordPropertyChanged = (propertyName, propertyValue) => {
    this.setState((prevState) => ({ word: { ...prevState.word, ...{ [propertyName]: propertyValue} } }));
  }
  render() {
    const isEditingMode = this.props.mode === 'edit';
    
    return (
      <div className='word-form'>
        <PageHeader>{ isEditingMode ? 'Edit word' : 'Add word' }</PageHeader>
        <div className="input-group form-group word-form__value-input-group mb-4">
          <input 
            type="text"
            className="form-control"
            id="value"
            value={this.state.word.value} 
            onChange={this.onWordValueChanged}
          />
        </div>
        <div className='d-flex flex-wrap align-items-start'>
          <ListViewEdit
            className='word-form__list'
            title='Translations:'
            list={this.props.word.translations}
            onChange={this.onWordPropertyChanged.bind(this, 'translations')}
          />

          <ListViewEdit
            className='word-form__list'
            title='Explanations:'
            list={this.props.word.explanations}
            onChange={this.onWordPropertyChanged.bind(this, 'explanations')}
          />

          <ListViewEdit
            className='word-form__list'
            title='Usages:'
            list={this.props.word.usages}
            onChange={this.onWordPropertyChanged.bind(this, 'usages')}
          />
        </div>
        <div className='word-form__actions mb-4 mt-2'>
          <button className='btn btn-default btn-primary' onClick={() => this.props.save(this.state.word)}>Save</button>
          <button className='btn btn-default btn-danger' onClick={this.props.cancel}>{ isEditingMode ? 'Revert' : 'Cancel' }</button>
        </div>
      </div>
    );
  }
}

WordForm.propTypes = {
  word: PropTypes.instanceOf(WordEntity).isRequired,
  save:  PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired
};

export default WordForm;