import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequestInterface} from 'src/app/auth/types/loginRequest.interface';
import {select, Store} from '@ngrx/store';
import {loginAction} from 'src/app/auth/store/actions/login.action';
import {Observable} from 'rxjs';
import {
  isSubmittingSelector,
  validationErrorSelector,
} from 'src/app/auth/store/selectors';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    const request: LoginRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(loginAction({request}));
  }
}
