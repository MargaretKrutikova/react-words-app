import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Page extends PureComponent {
  setPage = (event, page) => {
    if (event) {
      event.preventDefault();
    }
    if (this.props.isDisabled || this.props.isActive) return;
    this.props.onPageChange(page);
  }
  getPageClass() {
    let classes = ['page-item'];
    this.props.isActive && classes.push('active');
    this.props.isDisabled && classes.push('disabled');

    return classes.join(' ');
  }
  render() {
    const { page } = this.props;

    return (
      <li className={this.getPageClass()}>
        <a href="#" className='page-link' onClick={(event) => this.setPage(event, page)}>
          { this.props.children || page }
        </a>
      </li>);
  }
}

Page.propTypes = {
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  page: PropTypes.number.isRequired,
  children: PropTypes.node,
  onPageChange: PropTypes.func.isRequired
};

export default Page;