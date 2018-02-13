import WordEntity from './WordEntity';

import { createApolloFetch } from 'apollo-fetch';
import { GetPaginatedWords, GetWordById, SaveWord }  from  '../../graphql';

const uri = 'http://localhost:4000/graphql';
const apolloFetch = createApolloFetch({ uri });

class WordServiceApi {
  getWords(page, itemsPerPage) { 
    return apolloFetch({ query: GetPaginatedWords, variables: { page, itemsPerPage } })
      .then((res) => ({
        items: res.data.words.items.map((word) => new WordEntity(word)),
        total: res.data.words.total
      }))
      .catch((error) => console.log(error));
  }

  getWord(wordId) {
    return apolloFetch({ query: GetWordById, variables: { wordId } })
      .then((res) => new WordEntity(res.data.word))
      .catch((error) => console.log(error));
  }
  saveWord(word) {
    const { createdDate, updatedDate, ...saveWord } = word; // eslint-disable-line no-unused-vars
    return apolloFetch({ query: SaveWord, variables: { saveWord } })
      .then((res) => new WordEntity(res.data.word))
      .catch((error) => console.log(error));
  }
}

const wordService = new WordServiceApi();
export default wordService;