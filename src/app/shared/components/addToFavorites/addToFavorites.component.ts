import {Component, Input} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AddToFavoritesService} from './services/addToFavorites.service'
import {Store} from '@ngrx/store'
import {addToFavoritesAction} from './store/actions'

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false
  @Input() favoritesCount: number = 0
  @Input() articleSlug: string = ''

  constructor(private store: Store) {}

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesAction.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    )
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }

    this.isFavorited = !this.isFavorited
  }
}
