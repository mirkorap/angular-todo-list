export class MultilineString extends Error {
  constructor() {
    super();
    this.name = 'MultilineString';
    this.message = 'The string must be on single line';
  }
}
