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
            <span className="input-group-addon list-view-edit__btn-remove" onClick={() => this.removeListValue(ind)}>
              <svg  height="20px" viewBox="0 0 32 32" width="20px" 
                xmlns="http://www.w3.org/2000/svg">
                <path id='remove' d="M20.377,16.519l6.567-6.566c0.962-0.963,0.962-2.539,0-3.502l-0.876-0.875c-0.963-0.964-2.539-0.964-3.501,0  L16,12.142L9.433,5.575c-0.962-0.963-2.538-0.963-3.501,0L5.056,6.45c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.538,0,3.501l0.876,0.876c0.963,0.963,2.539,0.963,3.501,0L16,20.896l6.567,6.566  c0.962,0.963,2.538,0.963,3.501,0l0.876-0.876c0.962-0.963,0.962-2.538,0-3.501L20.377,16.519z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default ListViewEdit;