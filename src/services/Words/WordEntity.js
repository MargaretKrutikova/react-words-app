class WordEntity {
  constructor({
    id = 0,
    value = '',
    type = '',
    translations = [],
    explanations = [],
    usages = []
  } = {}) {
    this.id = id;
    this.value = value;
    this.type = type;
    // copy the arrays to avoid mutations
    this.translations = translations.slice();
    this.explanations = explanations.slice();
    this.usages = usages.slice();
  }
}

export default WordEntity;