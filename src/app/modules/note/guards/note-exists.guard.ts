import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NoteStoreFacadeService } from '@note/services';
import { Observable } from 'rxjs';

@Injectable()
export class NoteExistsGuard implements CanActivate {
  constructor(
    private noteStoreFacade: NoteStoreFacadeService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() =>
        this.noteStoreFacade.hasNote(route.params.id).pipe(
          tap((hasNote) => {
            !hasNote && this.router.navigateByUrl('/notes');
          })
        )
      )
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
