import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface'
import {PopularTagType} from '../../../types/popularTag.type'

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tag success': props<{
      popularTags: PopularTagType[]
    }>(),
    'Get popular tag failure': emptyProps(),
  },
})
