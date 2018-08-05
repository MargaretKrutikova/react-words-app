// @flow
import PropTypes from 'prop-types';

export type WordApiResponseType = {|
  _id: string,
  value: string,
  translations?: Array<string>,
  explanations?: Array<string>,
  usages?: Array<string>,
  createdDate?: string,
  updatedDate?: string
|};

export type WordType = {|
  id: ?string,
  value: string,
  translations: Array<string>,
  explanations: Array<string>,
  usages: Array<string>,
  createdDate: ?Date,
  updatedDate: ?Date
|};

const copyOrEmpty = (array: ?Array<string>): Array<string> =>
  !array ? [] : [...array];

const convertToDate = (dateString: ?string) =>
  dateString ? new Date(dateString) : undefined;

export const copyWord = (word: WordType) => {
  const { translations, explanations, usages, ...rest } = word;
  return {
    ...rest,
    translations: copyOrEmpty(translations),
    explanations: copyOrEmpty(explanations),
    usages: copyOrEmpty(usages)
  };
};

export const convertFromApiType = (word: ?WordApiResponseType) => ({
  id: word ? word._id : undefined,
  value: word ? word.value : '',
  translations: copyOrEmpty(word ? word.translations : null),
  explanations: copyOrEmpty(word ? word.explanations : null),
  usages: copyOrEmpty(word ? word.usages : null),
  createdDate: convertToDate(word ? word.createdDate : undefined),
  updatedDate: convertToDate(word ? word.updatedDate : undefined)
});

export const createWord = (): WordType => ({
  id: undefined,
  value: '',
  translations: [],
  explanations: [],
  usages: [],
  createdDate: undefined,
  updatedDate: undefined
});

export const WordTypeFactory = {
  createWord,
  copyWord,
  convertFromApiType
};

export const WordTypeShape = {
  id: PropTypes.string,
  value: PropTypes.string,
  translations: PropTypes.arrayOf(PropTypes.string),
  explanations: PropTypes.arrayOf(PropTypes.string),
  usages: PropTypes.arrayOf(PropTypes.string),
  createdDate: PropTypes.instanceOf(Date),
  updatedDate: PropTypes.instanceOf(Date)
};
