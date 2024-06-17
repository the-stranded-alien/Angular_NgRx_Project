import {Component, OnInit} from '@angular/core'
import {FeedComponent} from '../../../shared/components/feed/feed.component'
import {BannerComponent} from '../../../shared/components/banner/banner.component'
import {ErrorMessageComponent} from '../../../shared/components/errorMessage/errorMessage.component'
import {PopularTagComponent} from '../../../shared/components/popularTags/popularTag.component'
import {FeedTogglerComponent} from '../../../shared/components/feedToggler/feedToggler.component'
import {ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tagFeed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    ErrorMessageComponent,
    PopularTagComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = ''
  tagName: string = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug']
      this.apiUrl = `/articles?tag=${this.tagName}`
    })
  }
}
