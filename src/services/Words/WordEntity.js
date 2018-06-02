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

    this.translations = (word && word.translations) || [];
    this.explanations = (word && word.explanations) || [];
    this.usages = (word && word.usages) || [];

    this.createdDate = word ? word.createdDate : new Date();
    this.updatedDate = word ? word.updatedDate : new Date();
  }
}

export default WordEntity;