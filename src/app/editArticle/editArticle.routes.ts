import {Route} from '@angular/router'
import {EditArticleComponent} from './components/editArticle/editArticle.component'
import {EditArticleService} from './services/editArticle.service'
import * as editArticleEffect from './store/effects'
import {provideEffects} from '@ngrx/effects'
import {provideState} from '@ngrx/store'
import {editArticleFeatureKey, editArticleReducer} from './store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffect),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
