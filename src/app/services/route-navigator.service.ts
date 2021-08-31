import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteNavigatorParams<T> {
  params: T;
}

export interface RouteNavigatorQueryParams<T> {
  queryParams?: T;
}

@Injectable({
  providedIn: 'root'
})
export class RouteNavigatorService {
  constructor(private router: Router) {}

  navigateToSignIn(): Promise<boolean> {
    return this.router.navigateByUrl('/auth');
  }

  navigateToNoteOverview(): Promise<boolean> {
    return this.router.navigateByUrl('/notes');
  }

  navigateToNewNote(): Promise<boolean> {
    return this.router.navigateByUrl('/notes/new');
  }

  navigateToEditNote(
    options: RouteNavigatorParams<{ id: string }>
  ): Promise<boolean> {
    return this.router.navigateByUrl(`/notes/${options.params.id}`);
  }
}
