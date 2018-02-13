import WordFragment from './wordFragment';

const SaveWord = `
  mutation SaveWord($saveWord: WordInputType!) {
    SaveWord(input: $saveWord) {
      ...WordFragment
    }
  }
  ${WordFragment}
`;

export default SaveWord;