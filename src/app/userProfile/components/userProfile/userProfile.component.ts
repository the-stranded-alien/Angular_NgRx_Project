import {Component, computed, inject, OnInit} from '@angular/core'
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {userProfileActions} from '../../store/actions'
import {combineLatest, filter, map} from 'rxjs'
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../../store/reducers'
import {selectCurrentUser} from '../../../auth/store/reducer'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {UserProfileInterface} from '../../types/userProfile.interface'
import {CommonModule} from '@angular/common'
import {FeedComponent} from '../../../shared/components/feed/feed.component'

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  // constructor(
  //   private route: ActivatedRoute,
  //   private store: Store,
  //   private router: Router
  // ) {}
  // Using inject()
  route = inject(ActivatedRoute)
  router = inject(Router)
  store = inject(Store)

  slug: string = ''
  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter(
        (currentUser): currentUser is CurrentUserInterface | null =>
          currentUser !== undefined
      )
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({currentUser, userProfile}) => {
      return currentUser?.username === userProfile.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  })

  // Using signal with RxJs
  // isLoading = this.store.selectSignal(selectIsLoading)
  // computedLoading = computed(() => this.isLoading() ? 'true' : 'false')

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }
}
