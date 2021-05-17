import {Component, OnInit} from '@angular/core';
import {GetPopularTagResponseInterface} from '../types/getPopularTagResponse.interface';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../store/selectors';
import {getPopularTagsAction} from '../store/actions/getPopularTags.actions';
import {PopularTagType} from '../../../types/popularTag.type';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html'
})
export class PopularTagsComponent implements OnInit {
  isLoading: Observable<boolean>;
  error$: Observable<string | null>;
  popularTags$: Observable<PopularTagType[] | null>;

  constructor(
    private store: Store
    ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchPopularTags();
  }

  initializeValues(): void {
    this.isLoading = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
  }

  fetchPopularTags(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
