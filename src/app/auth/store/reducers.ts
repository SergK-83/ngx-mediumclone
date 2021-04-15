import {AuthStateInterface} from 'src/app/shared/types/authState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/auth/store/actions/login.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoggedIn: true,
    })
  ),
  on(loginFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  }))
);

/*
Мы не можем напрямую экспортировать const authReducer.
Для production build angular собирает AOT build. (Это ahead of time
compiler. Компоненты компилируются заранее и не проходят этап клиентской компиляции. Меньший размер bundle, более быстрое время загрузки).
В случае с AOT "const authReducer" не будет работать правильно с экспортом,
нам нужно экспортировать именно export function.
 */

export function reducers(
  state: AuthStateInterface,
  action: Action
): AuthStateInterface {
  return authReducer(state, action);
}
