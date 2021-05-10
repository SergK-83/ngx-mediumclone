import {Injectable} from '@angular/core';
import {PopularTagsService} from '../../services/popularTags.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from '../actions/getPopularTags.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {GetPopularTagResponseInterface} from '../../types/getPopularTagResponse.interface';
import {of} from 'rxjs';

@Injectable()
export class GetPopularTagsEffect {
  constructor(private actions$: Actions, private popularTagsService: PopularTagsService) {
  }

  getPopularTags$ = createEffect( () =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map( (popularTags: GetPopularTagResponseInterface) => {
            return getPopularTagsSuccessAction({popularTags});
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    )
  );
}
