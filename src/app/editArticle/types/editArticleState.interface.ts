import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface'
import {ArticleInterface} from '../../shared/types/article.interface'

export interface EditArticleStateInterface {
  article: ArticleInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
