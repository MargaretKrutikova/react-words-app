// @flow
import type { WordType, WordApiResponseType } from './WordType';
import { convertFromApiType } from './WordType';
import apolloFetchWrapper from '../apolloFetch';
import { GetPaginatedWords, GetWordById, SaveWord } from '../../graphql';

type PaginatedWordsApiData = {
  items: Array<WordApiResponseType>,
  total: number
};
type PaginatedWordsApiResponse = {
  words: PaginatedWordsApiData
};
type WordApiResponse = {
  word: WordApiResponseType
};
type PaginatedWords = {
  items: Array<WordType>,
  total: number
};

class WordServiceApi {
  async getWords(page: number, itemsPerPage: number): Promise<PaginatedWords> {
    return apolloFetchWrapper({
      query: GetPaginatedWords,
      variables: { page, itemsPerPage }
    }).then((data: PaginatedWordsApiResponse) => ({
      items: data.words.items.map((word: WordApiResponseType) =>
        convertFromApiType(word)
      ),
      total: data.words.total
    }));
  }
  async getWord(wordId: string): Promise<WordType> {
    return apolloFetchWrapper({
      query: GetWordById,
      variables: { wordId }
    }).then((data: WordApiResponse): WordType => convertFromApiType(data.word));
  }
  async saveWord(word: WordType): Promise<WordType> {
    const { createdDate, updatedDate, ...saveWord } = word; // eslint-disable-line no-unused-vars
    return apolloFetchWrapper({
      query: SaveWord,
      variables: { saveWord }
    }).then((data: WordApiResponse): WordType => convertFromApiType(data.word));
  }
}

const wordService = new WordServiceApi();
export default wordService;
