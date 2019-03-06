import NoImageException from '../../common/exception/ServerError'
import { Observable } from 'rxjs'

export default class NewsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return Observable.create(emitter => {
       this.client.getNews(this.client.getToken())
        .catch((e) =>
          Observable.of([])
        )
        .flatMap(news => Observable.from(news))
        .flatMap(news =>
          Observable.zip(
           this.client.getNewsImage(this.client.getToken(), news.imageUrl),
           (newsBlob) => {
             const updatedNews = news
             updatedNews.imageUrl = newsBlob
             return updatedNews
           })
        )
        .subscribe(news => emitter.next(news),
         e => {
           emitter.complete(e)
         },
         e => {
          emitter.error()
        }
      )
    })
  }
}
