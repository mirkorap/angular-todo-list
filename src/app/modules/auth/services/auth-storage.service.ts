import { DataStorageService } from '@shared/services/data-storage.service';
import { IUserDto } from '@auth/data-transfer-objects/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorageService {
  private static USER_STORAGE_KEY = 'user';

  constructor(private dataStorage: DataStorageService) {}

  getUser(): IUserDto | null {
    return this.dataStorage.get(AuthStorageService.USER_STORAGE_KEY);
  }

  setUser(user: IUserDto): void {
    this.dataStorage.set(AuthStorageService.USER_STORAGE_KEY, user);
  }

  removeUser(): void {
    this.dataStorage.remove(AuthStorageService.USER_STORAGE_KEY);
  }
}
