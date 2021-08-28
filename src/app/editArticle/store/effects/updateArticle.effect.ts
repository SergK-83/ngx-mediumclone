import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from 'src/app/editArticle/store/actions/updateArticle.action';
import {EditArticleService} from 'src/app/editArticle/services/editArticle.service';

@Injectable()
export class UpdateArticleEffect {
  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({slug, articleInput}) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleFailureAction({errors: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {dispatch: false}
  );
}
