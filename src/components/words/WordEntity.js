class WordEntity {
  constructor({
    id = 0,
    value = '',
    type,
    translations = [],
    explanations = [],
    usages = []
  }) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.translations = translations;
    this.explanations = explanations;
    this.usages = usages;
  }
}

export default WordEntity;