import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ArticleRequestInterface} from '../../shared/types/articleRequest.interface'
import {map, Observable} from 'rxjs'
import {ArticleInterface} from '../../shared/types/article.interface'
import {environment} from '../../../environments/environment'
import {ArticleResponseInterface} from '../../shared/types/articleResponse.interface'

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article))
  }
}
