import GetPodcastsInteractor from '../../../domain/interactor/podcast/GetPodcastsInteractor'
import GetPodcastInteractor from '../../../domain/interactor/podcast/GetPodcastInteractor'
import GetPodcastReview from '../../../domain/interactor/podcast/PodcastReviewInteractor'
import AddPodcastRatingInteractor from '../../../domain/interactor/podcast/AddPodcastRatingInteractor'
import PodcastParam from '../../../domain/param/PodcastRateParam'


import { NotifyActions } from '../../../actions'
import store from '../../../store'

export default class PodcastPresenter {
  constructor (container) {
    this.getPodcastsInteractor = new GetPodcastsInteractor(container.get('HRBenefitsClient'))
    this.addPodcastRatingInteractor = new AddPodcastRatingInteractor(container.get('HRBenefitsClient'))
    this.getPodcastInteractor = new GetPodcastInteractor(container.get('HRBenefitsClient'))
    this.getPodcastReviewInteractor = new GetPodcastReview(container.get('HRBenefitsClient'))
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
    }
  )
}
  getPodcastsReviews () {
    this.view.showLoading()

    this.getPodcastReviewInteractor.execute()
      .subscribe(podcasts => {
          this.view.hideLoading()
          this.view.showPodcastReview(podcasts)
        }, e => {
          this.view.hideLoading()
          // TODO prompt generic error
    }
  )
}

  paddRating (id, rating, comments) {
    this.view.circularLoader(true)
    this.addPodcastRatingInteractor.execute(PodcastParam(id, rating, comments))
    .subscribe(
      data => {
        store.dispatch(NotifyActions.addNotify({
            title : 'Podcast Rating',
            message : data.message,
            type : 'success',
            duration : 2000
          })
        )
        this.view.circularLoader(false)
      },
      error => {
        this.view.hideLoading()
      }
    )
  }
}
