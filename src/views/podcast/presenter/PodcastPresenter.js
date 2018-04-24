import PodcastInteractor from '../../../domain/interactor/podcast/PodcastInteractor'


export default class PodcastPresenter {
  constructor (container) {
    this.PodcastInteractor = new PodcastInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPodcast () {
    this.view.showLoading()
    this.PodcastInteractor.execute()
    .subscribe(books => {
        this.view.hideLoading()
        this.view.showPodcast(podcasts)
      }, e => {
        this.view.hideLoading()
        // TODO prompt generic error
      })
  }
}
