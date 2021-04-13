import {AuthStateInterface} from 'src/app/shared/types/authState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {registerAction} from 'src/app/auth/store/actions/register.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  )
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
