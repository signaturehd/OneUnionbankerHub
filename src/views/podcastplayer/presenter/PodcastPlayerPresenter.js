import GetPodcastsInteractor from '../../../domain/interactor/podcast/GetPodcastsInteractor'
import GetPodcastInteractor from '../../../domain/interactor/podcast/GetPodcastInteractor'

export default class PodcastPresenter {
  constructor (container) {
    this.getPodcastsInteractor = new GetPodcastsInteractor(container.get('HRBenefitsClient'))
    this.getPodcastInteractor = new GetPodcastInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPodcast (id) {
    this.view.showLoading()

    this.getPodcastInteractor.execute(id)
      .subscribe(resp => {
        this.view.hideLoading()
        this.view.showPodcast(resp)
      }, e => {
        this.view.hideLoading()
        // TODO show error
      })
  }

  getPodcasts () {
    this.view.showLoading()

    this.getPodcastsInteractor.execute()
      .subscribe(podcasts => {
          this.view.hideLoading()
          this.view.showPodcasts(podcasts)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
      })
  }
}
