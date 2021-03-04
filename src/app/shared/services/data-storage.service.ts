import { Injectable } from '@angular/core';

@Injectable()
export abstract class DataStorageService {
  abstract get<T>(key: string): T | null;

  abstract set<T>(key: string, value: T): void;

  abstract getKeys(): string[];

  abstract containsKey(key: string): boolean;

  abstract clear(): void;

  abstract remove(key: string): void;
}
