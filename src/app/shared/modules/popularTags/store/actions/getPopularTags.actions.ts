import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
import {GetPopularTagResponseInterface} from '../../types/getPopularTagResponse.interface';
import {PopularTagType} from '../../../../types/popularTag.type';

export const getPopularTagsAction = createAction(
  ActionTypes.GET_TAGS
);

export const getPopularTagsSuccessAction = createAction(
  ActionTypes.GET_TAGS_SUCCESS,
  props<{popularTags: PopularTagType[]}>()
);

export const getPopularTagsFailureAction = createAction(
  ActionTypes.GET_TAGS_FAILURE
);
