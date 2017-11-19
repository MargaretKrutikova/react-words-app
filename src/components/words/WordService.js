import axios from 'axios';
import WordEntity from './WordEntity';
import words from '../../../api/words.json';

class WordService {
  getWords(page, limit) {
    return new Promise((resolve, reject) => {
      resolve(words.data.map((word) => new WordEntity(word)));
    });
  }
}

const wordService = new WordService();
export default wordService;