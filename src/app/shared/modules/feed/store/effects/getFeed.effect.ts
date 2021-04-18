import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/getFeed.action';
import {switchMap, map, catchError} from 'rxjs/operators';
import {FeedService} from '../../services/feed.service';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';
import {of} from 'rxjs';

@Injectable()
export class GetFeedEffect {
  constructor(private actions$: Actions, private feedService: FeedService) {
  }

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed});
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );
}
