import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {ArticleFormValuesInterface} from './types/articleFormValues.interface'
import {BackendErrorsInterface} from '../../types/backendErrors.interface'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {BackendErrorMessagesComponent} from '../backendErrorMessages/backendErrorMessages.component'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'mc-article-form',
  templateUrl: 'articleForm.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface
  @Input() isSubmitting: boolean = false
  @Input() errors: BackendErrorsInterface | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  })

  ngOnInit(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided')
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }

  constructor(private fb: FormBuilder) {}
}
