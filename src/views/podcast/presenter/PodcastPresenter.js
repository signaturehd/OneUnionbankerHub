import GetPodcastsInteractor from '../../../domain/interactor/podcast/GetPodcastsInteractor'
import PodcastRecommendationInteractor from '../../../domain/interactor/podcast/PodcastRecommendationInteractor'

import PodcastRateParam from '../../../domain/param/PodcastRateParam'

export default class PodcastPresenter {
  constructor (container) {
    this.getPodcastsInteractor = new GetPodcastsInteractor(container.get('HRBenefitsClient'))
    this.getPodcastRecommendationInteractor = new PodcastRecommendationInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPodcasts () {
    this.view.showLoading()

    this.getPodcastsInteractor.execute()
      .subscribe(podcasts => {
          this.view.hideLoading()
          this.view.podcasts(podcasts)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
      })
  }

  getPodcastsRecommendations (disabled) {
    this.view.showLoading()

    this.getPodcastRecommendationInteractor.execute()
      .subscribe(podcasts => {
        this.view.hideLoading()
        this.view.podcastsRecommendation(podcasts)
      }, e => {
        this.view.hideLoading()
        // TODO prompt generic error
      })
  }
}
