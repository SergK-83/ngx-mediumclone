import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from './actions/getPopularTags.actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducers(state: PopularTagsStateInterface, action: Action): PopularTagsStateInterface {
  return popularTagsReducer(state, action);
}
