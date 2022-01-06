import {SettingsStateInterface} from 'src/app/settings/types/settingsState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from 'src/app/auth/store/actions/updateCurrentUser.action';


const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const settingsReducer = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);

export function reducers(state: SettingsStateInterface, action: Action): SettingsStateInterface {
  return settingsReducer(state, action);
}
