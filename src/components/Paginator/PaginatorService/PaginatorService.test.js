import 'babel-polyfill';
import cases from 'jest-in-case';
import PaginatorService from './PaginatorService';

const maxPagesToShow = 4;

const paginatorInput = (totalItems, itemsPerPage, currentPage) => {
  return { totalItems, itemsPerPage, maxPagesToShow, currentPage };
};

const paginatorOutput = (currentPage, totalPages, pagesToShow) => {
  return { currentPage, totalPages, pagesToShow };
};

cases('getPaginator', (opts) => {
  const paginator = PaginatorService.getPaginator(opts.input);

  expect(paginator).toEqual(opts.output);
}, [
  // pages outside of showing range available
  { input: paginatorInput(47, 6, 1), output: paginatorOutput(1, 8, [1, 2, 3, 4]) },
  { input: paginatorInput(47, 6, 3), output: paginatorOutput(3, 8, [1, 2, 3, 4]) },
  { input: paginatorInput(47, 6, 4), output: paginatorOutput(4, 8, [2, 3, 4, 5]) },
  { input: paginatorInput(47, 6, 7), output: paginatorOutput(7, 8, [5, 6, 7, 8]) },
  { input: paginatorInput(47, 6, 8), output: paginatorOutput(8, 8, [5, 6, 7, 8]) },
  // total number of pages is less than max showing range
  { input: paginatorInput(17, 6, 1), output: paginatorOutput(1, 3, [1, 2, 3]) },
  { input: paginatorInput(17, 6, 2), output: paginatorOutput(2, 3, [1, 2, 3]) },
  { input: paginatorInput(17, 6, 3), output: paginatorOutput(3, 3, [1, 2, 3]) },
  // only page available
  { input: paginatorInput(5, 6, 1), output: paginatorOutput(1, 1, [1]) },
  // no items to show
  { input: paginatorInput(0, 6, 1), output: paginatorOutput(1, 0, []) },
  // current page is zero
  { input: paginatorInput(0, 6, 0), output: paginatorOutput(0, 0, []) },
]);