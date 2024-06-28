import {SettingsStateInterface} from '../types/settingsState.interface'
import {createFeature, createReducer, on} from '@ngrx/store'
import {authActions} from '../../auth/store/actions'
import {routerNavigationAction} from '@ngrx/router-store'

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectValidationErrors,
  selectIsSubmitting,
} = settingsFeature
