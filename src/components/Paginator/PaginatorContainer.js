import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paginator from './Paginator';
import PaginatorService from './PaginatorService/PaginatorService';

class PaginatorContainer extends PureComponent {
  state = {
    currentPage: 0,
    totalPages: 0,
    pagesToShow: []
  };
  componentDidMount() {
    this.updatePaginatorState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalItems !== this.props.totalItems) {
      this.updatePaginatorState(nextProps);
    } else if (nextProps.itemsPerPage !== this.props.itemsPerPage) {
      // number of items per page has changed - reset current page to page 1.
      this.updatePaginatorState(nextProps, 1);
    }
  }
  updatePaginatorState = (props, currentPage) => {
    currentPage = currentPage || props.initialPage;
    this.setState(PaginatorService.getPaginator({...props, currentPage }));
  }
  setPage = (page) => {
    this.updatePaginatorState(this.props, page);
    this.props.onPageChange(page);
  }
  render() {
    return (
      <Paginator 
        onPageChange={this.setPage}
        {...this.state}
      />
    );
  }
}
PaginatorContainer.defaultProps = {
  initialPage: 1,
  itemsPerPage: 10,
  maxPagesToShow: 3
};
PaginatorContainer.propTypes = {
  totalItems: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  maxPagesToShow: PropTypes.number
};

export default PaginatorContainer;