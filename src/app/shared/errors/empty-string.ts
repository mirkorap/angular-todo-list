export class EmptyString extends Error {
  constructor() {
    super();
    this.name = 'EmptyString';
    this.message = 'String could not be empty';
  }
}
