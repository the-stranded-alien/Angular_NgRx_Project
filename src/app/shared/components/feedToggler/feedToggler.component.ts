import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from '../../../auth/store/reducer'
import {CommonModule} from '@angular/common'
import {RouterLink, RouterLinkActive} from '@angular/router'

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent {
  @Input() tagName?: string

  currentUser$ = this.store.select(selectCurrentUser)

  constructor(private store: Store) {}
}
