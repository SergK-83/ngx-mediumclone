import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from 'src/app/shared/types/appState.interface';
import {SettingsStateInterface} from 'src/app/settings/types/settingsState.interface';


export const settingFeatureSelector = createFeatureSelector<
  AppStateInterface,
  SettingsStateInterface
>('settings');

export const isSubmittingSelector = createSelector(
  settingFeatureSelector,
  (settingState: SettingsStateInterface) => settingState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingFeatureSelector,
  (settingState: SettingsStateInterface) => settingState.validationErrors
);
