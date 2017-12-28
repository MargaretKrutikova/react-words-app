import objectAssign from 'object-assign';
import React, { PureComponent } from 'react';
import './_ListViewEdit.scss';

class ListViewEdit extends PureComponent {
  state = {
    values: []
  };
  componentDidMount() {
    this.setState({ values: this.copyList(this.props.list) });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.list != nextProps.list) {
      this.setState({ values: this.copyList(nextProps.list) });
    }
  }

  copyList = (list) => {
    let copy = (list || []).slice();
    // add empty element to display one input in case the list is empty
    if (copy.length === 0) copy.push('');

    return copy;
  }
  notifyParentOnChange = () => {
    this.props.onChange(this.state.values);
  }
  onValueChanged = (newValue, index) => {
    this.setState((prevState) => ({
      values: objectAssign([...prevState.values], { [index] : newValue })
    }), this.notifyParentOnChange);
  }

  addListValue = () => {
    this.setState((prevState) => ({
      values: prevState.values.concat([''])
    }), this.notifyParentOnChange);
  }

  removeListValue = (indexToRemove) => {
    this.setState((prevState) => ({
      values: prevState.values.filter((val, ind) => (ind != indexToRemove))
    }), this.notifyParentOnChange);
  }
  render() {
    const className = `list-view-edit ${this.props.className || ''}`;
    return (
      <div className={className}>
        <div className='list-view-edit__title'>
          <h5>{this.props.title}</h5>
          <button className='btn btn-default btn-sm' onClick={this.addListValue}>Add</button>
        </div>
        
        { this.state.values.map((value, ind) => (
          <div key={ind}  className="list-view-edit__input-group input-group">
            <input
              type="text"
              value={value}
              className="form-control"
              onChange={(e)=> this.onValueChanged(e.target.value, ind)}
            />
            <span className="input-group-btn">
              <button 
                type="button" 
                onClick={() => this.removeListValue(ind)} 
                className="btn btn-default list-view-edit__btn-remove"
              >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default ListViewEdit;