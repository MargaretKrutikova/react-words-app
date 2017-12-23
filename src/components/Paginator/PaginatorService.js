
class PaginatorService {
  static calculateTotalPages = (totalItems, itemsPerPage) => 
    Math.ceil(totalItems / itemsPerPage);

  static createRange(start, end) {
    let total = end - start + 1;
    if (total <= 0) return [];
    return Array(total).fill(start).map((value, index) => value + index);
  }

  getPaginator({
    totalItems,
    itemsPerPage,
    maxPagesToShow,
    currentPage })
  {
    let totalPages = PaginatorService.calculateTotalPages(totalItems, itemsPerPage);
    let pagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    
    // determine start and end pages to show
    let startPage = Math.max(currentPage - pagesBeforeCurrent, 1);
    let endPage = startPage + maxPagesToShow - 1;

    // shift to the left if there are no more pages left in the end
    if (endPage > totalPages) {
      let extraPages = endPage - totalPages;
      startPage = Math.max(startPage - extraPages, 1);
      endPage = totalPages;
    }
    
    // create array of pages to show
    let pagesToShow = PaginatorService.createRange(startPage, endPage);
    return { currentPage, totalPages, pagesToShow };
  }
}

export default new PaginatorService();