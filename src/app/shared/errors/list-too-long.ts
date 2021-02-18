export class ListTooLong extends Error {
  constructor(maxLength: number) {
    super();
    this.name = 'ListTooLong';
    this.message = `The list cannot contain more than ${maxLength} elements`;
  }
}
