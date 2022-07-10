import {UserProfileStateInterface} from 'src/app/userProfile/types/userProfileState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from 'src/app/userProfile/store/actions/getUserProfile.action';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile
    })
  ),
  on(
    getUserProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export  function reducers(
  state: UserProfileStateInterface,
  action: Action
): UserProfileStateInterface {
  return userProfileReducer(state, action);
}
