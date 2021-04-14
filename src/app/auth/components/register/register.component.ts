import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {registerAction} from 'src/app/auth/store/actions/register.action';
import {Observable} from 'rxjs';
import {isSubmittingSelector} from 'src/app/auth/store/selectors';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/services/auth.service';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /*
    Рекомендация: в ngOnInit делать вызовы одинаковых стандартных методов:
     fetch data, initialize listeners, initialize variables, initialize form
     */
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(registerAction({request}));

    // this.authService
    //   .register(this.form.value)
    //   .subscribe((currentUser: CurrentUserInterface) => {
    //     console.log(currentUser);
    //   });
  }
}
