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

  getPodcasts (disabled) {
    this.view.showLoader()
    this.getPodcastInteractor.execute()
    .subscribe(podcasts => {
        this.view.hideLoader()
        this.view.podcasts(podcasts)
      }, e => {
        this.view.hideLoader()
        // TODO prompt generic error
    })
  }

    getPodcastsReviews () {
      this.view.showLoader()
      this.getPodcastsReviewsInteractor.execute()
      .subscribe(podcasts => {
          this.view.hideLoader()
          this.view.podcastsreviews(podcasts)
        }, e => {
          this.view.hideLoader()
          // TODO prompt generic error
        })
    }
    getPodcastsRecommendations (disabled) {
      this.view.showLoader()
      this.getPodcastRecommendationInteractor.execute()
      .subscribe( podcasts => {
        this.view.hideLoader()
        this.view.podcastsRecommendation(podcasts)
      }, e => {
        this.view.hideLoader()
      })
    }
    paddRating (id, rating) {
      this.view.showLoader()
      this.addPodcastRatingInteractor.execute(PodcastRateParam(id, rating))
      .subscribe(
        data => {
          this.view.hideLoader()
        },
        error => {
          this.view.hideLoader()
        }
      )
  }

}
