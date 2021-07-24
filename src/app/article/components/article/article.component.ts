import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {deleteArticleAction} from 'src/app/article/store/actions/deleteArticle.action ';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return article.author.username === currentUser.username;
        }
      )
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }
}
