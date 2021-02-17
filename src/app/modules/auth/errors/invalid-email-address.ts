export class InvalidEmailAddress extends Error {
  constructor() {
    super();
    this.name = 'InvalidEmailAddress';
    this.message = 'Email address is not valid';
  }
}
