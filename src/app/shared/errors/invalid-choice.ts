export class InvalidChoice<T> extends Error {
  constructor(choices: T[]) {
    super();
    this.name = 'InvalidChoice';
    this.message = `You can select one of these options: ${choices.join(', ')}`;
  }
}
