import WordFragment from './wordFragment';

export const GetPaginatedWords = `
  query PaginatedWords($page: Int!, $itemsPerPage: Int!) {
    words(page: $page, itemsPerPage: $itemsPerPage) {
      total
      items {
        ...WordFragment
      }
    }
  }
  ${WordFragment}
`;

export const GetWordById = `
  query GetWord($wordId: String!) {
    word(key:$wordId) {
      ...WordFragment
    }
  }
  ${WordFragment}
`;