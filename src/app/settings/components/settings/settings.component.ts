import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {Observable, Subscription} from 'rxjs';
import {currentUserSelector} from 'src/app/auth/store/selectors';
import {validationErrorsSelector} from 'src/app/settings/store/selectors';
import {filter} from 'rxjs/operators';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';
import {isSubmittingSelector} from 'src/app/settings/store/selectors';
import {updateCurrentUserAction} from 'src/app/auth/store/actions/updateCurrentUser.action';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    });
  }

  // submit(): void {
  //   this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  // }
}
