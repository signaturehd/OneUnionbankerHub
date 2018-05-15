import PodcastInteractor from '../../../domain/interactor/podcast/PodcastInteractor'
import PodcastRecommendationInteractor from '../../../domain/interactor/podcast/PodcastRecommendationInteractor'
import PodcastViewedInteractor from '../../../domain/interactor/podcast/PodcastViewedInteractor'
import AddPodcastRatingInteractor from '../../../domain/interactor/podcast/AddPodcastRatingInteractor'
import PodcastRateParam from '../../../domain/param/PodcastRateParam'

export default class PodcastPresenter {
  constructor (container) {
    this.getPodcastInteractor = new PodcastInteractor(container.get('HRBenefitsClient'))
    this.getPodcastRecommendationInteractor = new PodcastRecommendationInteractor(container.get('HRBenefitsClient'))
    this.addPodcastRatingInteractor = new AddPodcastRatingInteractor(container.get('HRBenefitsClient'))
    this.getPodcastViewedInteractor = new PodcastViewedInteractor(container.get('HRBenefitsClient'))
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
      .subscribe(podcasts => {
          this.view.hideLoading()
          this.view.podcastsRecommendation(podcasts)
        }, e => {
          this.view.hideLoading()
      })
  }

  ratePodcasts (id, rating) {
    this.view.showLoading()
    this.addPodcastRatingInteractor.execute(PodcastRateParam(id, rating))
    .subscribe(data => {
        this.view.hideLoading()
      }, e => {
        this.view.hideLoading()
    })
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
