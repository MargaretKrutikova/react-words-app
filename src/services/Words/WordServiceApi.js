// @flow
import WordEntity from './WordEntity';
import type { WordType } from './WordEntity';
import apolloFetchWrapper from '../apolloFetch';
import { GetPaginatedWords, GetWordById, SaveWord } from '../../graphql';

class WordServiceApi {
  async getWords(page: number, itemsPerPage: number): Promise<any> {
    return apolloFetchWrapper({ query: GetPaginatedWords, variables: { page, itemsPerPage } })
      .then((data) => ({
        items: data.words.items.map((word) => new WordEntity(word)),
        total: data.words.total
      }));
  }
  async getWord(wordId: string): Promise<WordEntity> {
    return apolloFetchWrapper({ query: GetWordById, variables: { wordId } })
      .then((data: any): WordEntity => new WordEntity(data.word));
  }
  async saveWord(word: WordType): Promise<WordEntity> {
    const { createdDate, updatedDate, ...saveWord } = word; // eslint-disable-line no-unused-vars
    return apolloFetchWrapper({ query: SaveWord, variables: { saveWord } })
      .then((data: any): WordEntity => new WordEntity(data.word));
  }
}

const wordService = new WordServiceApi();
export default wordService;