import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileInterface} from 'src/app/shared/types/profile.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {errorSelector, isLoadingSelector, userProfileSelector} from 'src/app/userProfile/store/selectors';
import {getUserProfileAction} from 'src/app/userProfile/store/actions/getUserProfile.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {currentUserSelector} from 'src/app/auth/store/selectors';
import {filter, map} from 'rxjs/operators';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  slug: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ]).pipe(
      map(
        ([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface | null) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchData();
    });
  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return  isFavorites ? `/articles?favorited=${this.slug}` : `articles?author=${this.slug}`;
  }
}
