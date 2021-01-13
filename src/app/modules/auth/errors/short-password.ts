export class ShortPassword extends Error {
  constructor(minLength: number) {
    super();
    this.name = 'ShortPassword';
    this.message = `Password should contains at least ${minLength} characters`;
  }
}
