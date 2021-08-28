import {Component, OnInit} from '@angular/core';
import {ArticleInputInterface} from 'src/app/shared/types/articleInput.interface';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorSelector,
} from 'src/app/createArticle/store/selectors';
import {createArticleAction} from 'src/app/createArticle/store/actions/createArticle.action';

@Component({
  selector: 'mc-create-article',
  templateUrl: 'createArticle.component.html',
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
