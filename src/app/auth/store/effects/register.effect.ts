import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/services/auth.service';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistanceService} from 'src/app/shared/serveces/persistance.service';
import {Router} from '@angular/router';

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token); // используем сервис для работы с localStorage для обработки ошибок
            return registerSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          console.log('success');
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
