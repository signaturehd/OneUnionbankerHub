import PodcastInteractor from '../../../domain/interactor/podcast/PodcastInteractor'
import PodcastRecommendationInteractor from '../../../domain/interactor/podcast/PodcastRecommendationInteractor'
import AddBookRatingInteractor from '../../../domain/interactor/library/AddBookRatingInteractor'
import BookRateParam from '../../../domain/param/BookRateParam'

export default class PodcastPresenter {
    constructor (container) {
      this.getPodcastInteractor = new PodcastInteractor(container.get('HRBenefitsClient'))
      this.getPodcastRecommendationInteractor = new PodcastRecommendationInteractor(container.get('HRBenefitsClient'))
      this.addBookInteractor = new AddBookRatingInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getPodcasts () {
      this.view.showLoading()
      this.getPodcastInteractor.execute()
      .subscribe(podcasts => {
          this.view.hideLoading()
          this.view.podcasts(podcasts)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
        })
    }
    getPodcastsRecommendations () {
      this.view.showLoading()
      this.getPodcastRecommendationInteractor.execute()
      .subscribe( podcasts => {
        this.view.hideLoading()
        this.view.podcasts(podcasts)
      }, e=> {
        this.view.hideLoading()
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
