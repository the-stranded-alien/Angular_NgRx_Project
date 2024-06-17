import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
// import {register} from '../../store/actions'
import {authActions} from '../../store/actions'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
import {RouterLink} from '@angular/router'
// import {selectIsSubmitting} from '../../store/selectors'
import {AuthStateInterface} from '../../types/authState.interface'
import {CommonModule} from '@angular/common'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducer'
import {AuthService} from '../../services/auth.service'
import {combineLatest} from 'rxjs'
import {BackendErrorMessagesComponent} from '../../../shared/components/backendErrorMessages/backendErrorMessages.component'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent,
  ],
})
export class RegisterComponent {
  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  // isSubmitting$ = this.store.select(selectIsSubmitting)
  // backendErrors$ = this.store.select(selectValidationErrors)
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private formBuilder: FormBuilder,
    // private store: Store<{auth: AuthStateInterface}>,
    private store: Store // private authService: AuthService
  ) {}

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
    // this.authService.register(request).subscribe((res) => console.log(res)) // Shouldn't use it here directly
  }
}
