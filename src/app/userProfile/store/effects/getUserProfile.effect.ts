import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserProfileService} from 'src/app/userProfile/services/userProfile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from 'src/app/userProfile/store/actions/getUserProfile.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProfileInterface} from 'src/app/shared/types/profile.interface';
import {of} from 'rxjs';

@Injectable()
export class GetUserProfileEffect {
  constructor(private actions$: Actions, private userProfileService: UserProfileService) {
  }

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return getUserProfileSuccessAction({userProfile});
          }),
          catchError(() => {
            return of(
              getUserProfileFailureAction()
            );
          })
        );
      })
    )
  );
}
