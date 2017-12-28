import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  state = {
    isVisibleNavigation: false
  }
  toggleNavigation = () => {
    this.setState((prevState) => ({ isVisibleNavigation: !prevState.isVisibleNavigation }));
  }
  render() {
    return (
      <header className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to='/'>Words</Link>
          <button className="navbar-toggler d-sm-block d-md-none" type="button" onClick={this.toggleNavigation}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <nav className={!this.state.isVisibleNavigation ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <ul className='navbar-nav mr-auto'>
              <li className="nav-item active"><Link className="nav-link" to='/'>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to='/list'>Words</Link></li>
              <li className="nav-item"><Link className="nav-link" to='/add'>Add</Link></li>
            </ul>
          </nav> 
        </div>
      </header>
    );
  }
}

export default Header;