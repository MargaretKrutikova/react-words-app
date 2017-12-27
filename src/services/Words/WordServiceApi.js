import axios from 'axios';
import WordEntity from './WordEntity';
import words from '../../../api/words.json';

class WordServiceApi {
  getWords(page, itemsPerPage) {
    return new Promise((resolve, reject) => {

      let totalItems = words.data.length;
      let paginatedWords = words.data
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((word) => new WordEntity(word));

      resolve({ words: paginatedWords, totalItems });
    });
  }

  getWord(wordId) {
    return new Promise((resolve, reject) => {

      let word = words.data.find((w) => w.id == wordId);
      if (word == undefined) {
        reject('Not found');
      } else {
        resolve(new WordEntity(word));
      }
    });
  }
  updateWord(word) {
    return new Promise((resolve, reject) => {
      
      let existingWord = words.data.find((w) => w.id == word.id);
      if (existingWord == undefined) {
        reject('Not found');
      } else {
        // update all properties
        existingWord.value = word.value;
        existingWord.type = word.type;
        existingWord.translations = word.translations;
        existingWord.explanations = word.explanations;
        existingWord.usages = word.usages;
        
        resolve();
      }
    });
  }
  createWord(word) {
    return new Promise((resolve, reject) => {
      
      let lastWord = words.data[words.data.length - 1];
      const newWordId = lastWord.id + 1;

      const newWord = {...this._copyWordProps(word), ...{ id: newWordId }};
      words.data.push(newWord);
      resolve(newWordId);
    });
  }
  _copyWordProps(word) {
    return {
      value: word.value,
      type: word.type,
      translations: word.translations,
      explanations: word.explanations,
      usages: word.usages
    };
  }
}

const wordService = new WordServiceApi();
export default wordService;