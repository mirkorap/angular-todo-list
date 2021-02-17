export class ShortPassword extends Error {
  constructor() {
    super();
    this.name = 'ShortPassword';
    this.message = `Password should contains at least 6 characters`;
  }
}
