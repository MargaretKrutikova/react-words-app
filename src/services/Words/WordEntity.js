// @flow
export type WordType = {
  _id: string,
  value: string,
  translations?: ?Array<string>,
  explanations?: ?Array<string>,
  usages?: ?Array<string>,
  createdDate?: ?Date,
  updatedDate?: ?Date
}

class WordEntity {
  _id: ?string;
  value: string;
  translations: Array<string>;
  explanations: Array<string>;
  usages: Array<string>;
  createdDate: ?Date;
  updatedDate: ?Date;

  constructor(word: ?WordType) {
    this._id = word ? word._id : undefined;
    this.value = word ? word.value : '';

    this.translations = this.copyOrEmpty(word ? word.translations : null);
    this.explanations = this.copyOrEmpty(word ? word.explanations : null);
    this.usages = this.copyOrEmpty(word ? word.usages : null);

    this.createdDate = word ? word.createdDate : new Date();
    this.updatedDate = word ? word.updatedDate : new Date();
  }
  copyOrEmpty<T>(array: ?Array<T>): Array<T> {
    return !array ? [] : [...array];
  }
}

export default WordEntity;