// flow-typed signature: 2bc6f3a95d9d81aa90053d93d11af6eb
// flow-typed version: a8a1001c9b/react-library-paginator_v2.x.x/flow_>=v0.25.x

declare module 'react-library-paginator' {
  declare type Props = {
    totalItems: number,
    onPageChange: (page: number) => void
  } & DefaultProps;

  declare type DefaultProps = {
    currentPage: number,
    itemsPerPage: number,
    maxPagesToShow: number,
    useBootstrapClasses: boolean,
    styles: PaginatorStyles,
    classes: PaginatorClasses,
    navigation: Navigation
  };

  declare type PaginatorStyles = {
    container?: Object,
    list?: Object
  } & PageStyles;

  declare type PageStyles = {
    pageItem?: Object,
    pageLink?: Object,
    pageLinkActive?: Object,
    pageLinkDisabled?: Object
  };

  declare type PaginatorClasses = {
    container?: string,
    list?: string
  } & PageClasses;

  declare type PageClasses = {
    pageItem?: string,
    pageLink?: string,
    pageLinkActive?: string,
    pageLinkDisabled?: string
  };

  declare type Navigation = {
    firstPageText?: string,
    prevPageText?: string,
    nextPageText?: string,
    lastPageText?: string,
    hideFirstPageNav?: boolean,
    hidePrevPageNav?: boolean,
    hideNextPageNav?: boolean,
    hideLastPageNav?: boolean
  };

  declare class PaginatorContainer extends React$Component<Props> {
    static defaultProps: DefaultProps;
  }

  declare module.exports: typeof PaginatorContainer;
}
