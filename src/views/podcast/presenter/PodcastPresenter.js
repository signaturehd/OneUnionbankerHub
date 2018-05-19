import PodcastInteractor from '../../../domain/interactor/podcast/PodcastInteractor'
import PodcastRecommendationInteractor from '../../../domain/interactor/podcast/PodcastRecommendationInteractor'
import PodcastViewedInteractor from '../../../domain/interactor/podcast/PodcastViewedInteractor'
import AddPodcastRatingInteractor from '../../../domain/interactor/podcast/AddPodcastRatingInteractor'
import PodcastRateParam from '../../../domain/param/PodcastRateParam'
import PodcastReviewInteractor from '../../../domain/interactor/podcast/PodcastReviewInteractor'

export default class PodcastPresenter {
    constructor (container) {
      this.getPodcastInteractor = new PodcastInteractor(container.get('HRBenefitsClient'))
      this.getPodcastRecommendationInteractor = new PodcastRecommendationInteractor(container.get('HRBenefitsClient'))
      this.addPodcastRatingInteractor = new AddPodcastRatingInteractor(container.get('HRBenefitsClient'))
      this.getPodcastViewedInteractor = new PodcastViewedInteractor(container.get('HRBenefitsClient'))
      this.getPodcastsReviewsInteractor = new PodcastReviewInteractor(container.get('HRBenefitsClient'))
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

    getPodcastsReviews () {
      this.view.showLoading()
      this.getPodcastsReviewsInteractor.execute()
      .subscribe(podcasts => {
          this.view.hideLoading()
          this.view.podcastsreviews(podcasts)
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
      }, e => {
        this.view.hideLoading()
      })
    }
    paddRating (id, rating) {
      this.view.showLoading()
      this.addPodcastRatingInteractor.execute(PodcastRateParam(id, rating))
      .subscribe(
        data => {
          this.view.hideLoading()
        },
        error => {
          this.view.hideLoading()
        }
      )
  }
  getPodcastsViewed () {
    this.view.showLoading()
    this.getPodcastViewedInteractor.execute()
    .subscribe(podcasts => {
        this.view.hideLoading()
      }, e => {
        this.view.hideLoading()
        // TODO prompt generic error
    })
  }
}
