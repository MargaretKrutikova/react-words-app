import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Page from './Page';

class Paginator extends PureComponent {
  render() {
    const { currentPage, totalPages, pagesToShow, onPageChange } = this.props;
    const isFirstPage = currentPage === 1, isLastPage = currentPage === totalPages;

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <Page {...{ onPageChange, page: 1, isDisabled: isFirstPage }}>
            <span>First</span>
          </Page>

          <Page {...{ onPageChange, page: currentPage - 1, isDisabled: isFirstPage }}>
            <span aria-hidden="true">&laquo;</span>
          </Page>
          
          {pagesToShow.map((page, index) => 
            <Page key={index} {...{onPageChange, page, isActive: page === currentPage }}/>)
          }
          
          <Page {...{ onPageChange, page: currentPage + 1, isDisabled: isLastPage }}>
            <span aria-hidden="true">&raquo;</span>
          </Page>
          <Page {...{ onPageChange, page: totalPages, isDisabled: isLastPage }}>
            <span>Last</span>
          </Page>
        </ul>
      </nav>
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