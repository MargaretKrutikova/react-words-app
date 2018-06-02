// @flow
import WordEntity from './WordEntity';
import type { WordType } from './WordEntity';
import apolloFetchWrapper from '../apolloFetch';
import { GetPaginatedWords, GetWordById, SaveWord } from '../../graphql';

class WordServiceApi {
  getWords(page: number, itemsPerPage: number) {
    return apolloFetchWrapper({ query: GetPaginatedWords, variables: { page, itemsPerPage } })
      .then((data) => ({
        items: data.words.items.map((word) => new WordEntity(word)),
        total: data.words.total
      }));
  }
  getWord(wordId: string) {
    return apolloFetchWrapper({ query: GetWordById, variables: { wordId } })
      .then((data) => new WordEntity(data.word));
  }
  saveWord(word: WordType) {
    const { createdDate, updatedDate, ...saveWord } = word; // eslint-disable-line no-unused-vars
    return apolloFetchWrapper({ query: SaveWord, variables: { saveWord } })
      .then((data) => new WordEntity(data.word));
  }
}

const wordService = new WordServiceApi();
export default wordService;