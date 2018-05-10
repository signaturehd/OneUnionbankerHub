import PodcastInteractor from '../../../domain/interactor/podcast/PodcastInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'



export default class PodcastPresenter {
    constructor (container) {
      this.getPodcastInteractor = new PodcastInteractor(container.get('HRBenefitsClient'))
      this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getPodcasts () {
      this.view.showLoading()

      this.getPodcastInteractor.execute()
      .subscribe(podcast => {
          this.view.hideLoading()
          this.view.news(podcast)
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
