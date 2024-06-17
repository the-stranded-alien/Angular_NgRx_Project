import {Component} from '@angular/core'
import {FeedComponent} from '../../../shared/components/feed/feed.component'
import {BannerComponent} from '../../../shared/components/banner/banner.component'
import {ErrorMessageComponent} from '../../../shared/components/errorMessage/errorMessage.component'
import {PopularTagComponent} from '../../../shared/components/popularTags/popularTag.component'
import {FeedTogglerComponent} from '../../../shared/components/feedToggler/feedToggler.component'

@Component({
  selector: 'mc-your-feed',
  templateUrl: './yourFeed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    ErrorMessageComponent,
    PopularTagComponent,
    FeedTogglerComponent,
  ],
})
export class YourFeedComponent {
  apiUrl = '/articles/feed'
}
