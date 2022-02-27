import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {logoutAction} from 'src/app/auth/store/actions/sync.action';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class LogoutEffect {

  constructor(private actions$: Actions, private persistanceService: PersistanceService, private router: Router) {
  }

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistanceService.set('accessToken', '');
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
