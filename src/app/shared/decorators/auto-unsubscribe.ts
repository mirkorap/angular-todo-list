export function AutoUnsubscribe() {
  return function (constructor: any): void {
    const orig = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (const prop in this) {
        const property = this[prop];
        if (typeof property.subscribe === 'function') {
          property.unsubscribe();
        }
      }
      orig?.apply();
    };
  };
}
