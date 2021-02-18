export class ExceedingLength extends Error {
  constructor(maxLength: number) {
    super();
    this.name = 'ExceedingLength';
    this.message = `The string exceeds the maximum length of ${maxLength} characters`;
  }
}
