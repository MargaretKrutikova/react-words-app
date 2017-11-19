import axios from 'axios';
import WordEntity from './WordEntity';
import words from '../../../api/words.json';

class WordService {
  getWords(page, itemsPerPage) {
    return new Promise((resolve, reject) => {

      let totalItems = words.data.length;
      let paginatedWords = words.data
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((word) => new WordEntity(word));

      resolve({ words: paginatedWords, totalItems });
    });
  }
}

const wordService = new WordService();
export default wordService;