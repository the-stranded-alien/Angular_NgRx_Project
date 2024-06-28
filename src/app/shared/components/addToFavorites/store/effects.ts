import {Actions, createEffect, ofType} from '@ngrx/effects'
import {inject} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {AddToFavoritesService} from '../services/addToFavorites.service'
import {addToFavoritesAction} from './actions'
import {ArticleInterface} from '../../../types/article.interface'

export const addToFavoriteEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesAction.addToFavorites),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesAction.addToFavoritesSuccess({article})
          }),
          catchError(() => {
            return of(addToFavoritesAction.addToFavoritesFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
