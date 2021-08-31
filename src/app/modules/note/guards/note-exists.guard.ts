import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';
import { RouteNavigatorService } from '@app/services';

@Injectable()
export class NoteExistsGuard implements CanActivate {
  constructor(
    private noteStoreFacade: NoteStoreFacadeService,
    private routeNavigator: RouteNavigatorService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        return this.noteStoreFacade.hasNote(route.params.id).pipe(
          tap((hasNote) => {
            !hasNote && this.routeNavigator.navigateToNoteOverview();
          })
        );
      })
    );
  }

  private checkStore(): Observable<boolean> {
    return this.noteStoreFacade.isLoaded$.pipe(
      tap((isLoaded) => !isLoaded && this.noteStoreFacade.loadAllNotes()),
      filter((isLoaded) => isLoaded),
      take(1)
    );
  }
}
