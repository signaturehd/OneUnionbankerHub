import NoImageException from '../../common/exception/ServerError'
import { Observable } from 'rxjs'

export default class NewsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    try {
      return Observable.create(emitter => {
         this.client.getNews(this.client.getToken())
          .flatMap(news => Observable.from(news))
          .flatMap(news => {
            if (news.imageUrl.charAt(0).toString() === '/') {
              return this.client.getNewsImage(this.client.getToken(), news.imageUrl)
                .map(blob => {
                  let updatedNews = news
                  updatedNews.imageUrl = blob
                  return updatedNews
                })
            } else {
              return Observable.of(news)
            }
          })
          .subscribe(news => emitter.next(news),
           e => {
             emitter.complete(e)
           },
           e => {
            emitter.error()
          }
        )
      })
    } catch (e) {
      console.log(e)
    }
  }
}
