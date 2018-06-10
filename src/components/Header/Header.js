import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  state = {
    isVisibleNavigation: false
  }
  toggleNavigation = () => {
    this.setState((prevState) => ({ isVisibleNavigation: !prevState.isVisibleNavigation }));
  }
  onBlur = (e) => {
    var currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({ isVisibleNavigation: false });
      }
    }, 0);
  }
  render() {
    return (
      <header className="navbar navbar-expand-lg sticky-top navbar-light bg-light"
        tabIndex="1"
        onBlur={this.onBlur}>
        <div className="container">
          <NavLink className="navbar-brand" to='/'>Words</NavLink>
          <button className="navbar-toggler d-sm-block d-md-none" type="button" onClick={this.toggleNavigation}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <nav className={!this.state.isVisibleNavigation ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <ul className='navbar-nav mr-auto'>
              <li className="nav-item"><NavLink className="nav-link" exact to='/'>Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to='/list/page'>Words</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to='/add'>Add</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;