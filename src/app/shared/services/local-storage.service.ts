import { DataStorageService } from './data-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService extends DataStorageService {
  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getKeys(): string[] {
    return Array.from({ length: localStorage.length }, (_, index) => {
      return localStorage.key(index) as string;
    });
  }

  containsKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  clear(): void {
    localStorage.clear();
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
