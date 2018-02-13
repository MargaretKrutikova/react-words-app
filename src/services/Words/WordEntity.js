class WordEntity {
  constructor({
    _id,
    value = '',
    translations = [],
    explanations = [],
    usages = [],
    createdDate = null,
    updatedDate = null
  } = {}) {
    this._id = _id;
    this.value = value;

    // copy the arrays to avoid mutations
    this.translations = translations.slice();
    this.explanations = explanations.slice();
    this.usages = usages.slice();
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}

export default WordEntity;