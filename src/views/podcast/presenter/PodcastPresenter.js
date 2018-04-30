import NewsInteractor from '../../../domain/interactor/news/NewsInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'



export default class PodcastPresenter {
    constructor (container) {
      this.getNewsInteractor = new NewsInteractor(container.get('HRBenefitsClient'))
       this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getNews () {
      this.view.showLoading()

      this.getNewsInteractor.execute()
      .subscribe(news => {
          this.view.hideLoading()
          this.view.news(news)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
        })
    }
  rateBook (id, rating) {
    this.view.showLoading()
    this.addBookInteractor.execute(BookRateParam(id, rating))
    .subscribe(
      data => {
        this.view.hideLoading()
      },
      error => {
        this.view.hideLoading()
      }
    )
  }
}
