import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AddToFavoritesService} from 'src/app/shared/modules/addToFavorites/services/addToFavorites.service';
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction
} from 'src/app/shared/modules/addToFavorites/store/actions/addToFavorites.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {of} from 'rxjs';

@Injectable()
export class AddToFavoriteEffect {
  constructor(private actions$: Actions, private addToFavoritesService: AddToFavoritesService) {
  }

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorite(slug)
          : this.addToFavoritesService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article});
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );
}
