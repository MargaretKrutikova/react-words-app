import React from 'react';
import PropTypes from 'prop-types';
import Paginator from './Paginator';
import PaginatorService from './PaginatorService/PaginatorService';

const PaginatorContainer = (props) => {
  const paginator = PaginatorService.getPaginator(props);
  
  return (
    <Paginator onPageChange={props.onPageChange} {...paginator}/>
  );
};

PaginatorContainer.defaultProps = {
  currentPage: 1,
  itemsPerPage: 10,
  maxPagesToShow: 3
};

PaginatorContainer.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  maxPagesToShow: PropTypes.number
};

export default PaginatorContainer;