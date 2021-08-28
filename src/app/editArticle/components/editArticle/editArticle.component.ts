import {Component, OnInit} from '@angular/core';
import {ArticleInputInterface} from 'src/app/shared/types/articleInput.interface';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorSelector,
} from 'src/app/editArticle/store/selectors';
import {updateArticleAction} from 'src/app/editArticle/store/actions/updateArticle.action';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from 'src/app/editArticle/store/actions/getArticle.action';
import {filter, map} from 'rxjs/operators';
import {ArticleInterface} from 'src/app/shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: 'editArticle.component.html',
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>;
  isLoading$: Observable<boolean>;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }
}
