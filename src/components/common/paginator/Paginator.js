import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const pageLinkStyles = {
  marginRight: '10px'
};
const activePageLinkStyles = {
  pointerEvents: 'none',
  cursor: 'default',
  textDecoration: 'none',
  color: 'black'
};

class Paginator extends PureComponent {
  getPageLinkStyles(page) {
    let isActive = page === this.props.currentPage;
    if (!isActive) return pageLinkStyles;

    return { ...pageLinkStyles, ...activePageLinkStyles };
  }
  setPage = (event, page) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onPageChange(page);
  }
  render() {
    return (
      <div>
        {this.props.pagesToShow.map((page, index) => 
          <a key={index}
            href=""
            style={this.getPageLinkStyles(page)}
            onClick={(event) => this.setPage(event, page)}>
            {page}
          </a>)}
      </div>
    );
  }
}

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pagesToShow: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func.isRequired
};

export default Paginator;