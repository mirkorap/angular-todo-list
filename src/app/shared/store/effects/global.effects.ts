import * as fromActions from '@shared/store/actions/global.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable()
export class GlobalEffects {
  constructor(private actions$: Actions, private toastr: ToastrService) {}

  setErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.setErrorMessage),
        tap(({ message }) => this.toastr.error(message.text))
      ),
    { dispatch: false }
  );

  setSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.setSuccessMessage),
        tap(({ message }) => this.toastr.success(message.text))
      ),
    { dispatch: false }
  );
}
