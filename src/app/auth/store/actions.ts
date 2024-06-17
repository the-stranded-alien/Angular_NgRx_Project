import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),
  },
})

// export const register = createAction(
//   '[Auth] Register',
//   props<{request: RegisterRequestInterface}>()
// )
//
// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{request: RegisterRequestInterface}>()
// )
//
// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{request: RegisterRequestInterface}>()
// )
