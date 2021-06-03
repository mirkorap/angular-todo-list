import { Observable, of } from 'rxjs';

export abstract class Entity {
  copyWith(properties: Partial<this>): this {
    const copy = new (this.constructor as { new (): never })();
    Object.assign(copy, this, properties);
    return copy;
  }

  asObservable(): Observable<this> {
    return of(this);
  }
}
