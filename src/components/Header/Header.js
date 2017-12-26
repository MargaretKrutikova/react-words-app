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
      <header className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" onClick={this.toggleNavigation} className="navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Words</a>
          </div>

          <nav className={!this.state.isVisibleNavigation ? 'collapse navbar-collapse' : ''}>
            <ul className="nav navbar-nav">
              <li><Link to='/'>Home</Link></li>
            </ul>
          </nav> 
        </div>
      </header>
    );
  }
}

export default Header;