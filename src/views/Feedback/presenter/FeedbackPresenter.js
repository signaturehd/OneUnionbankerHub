import GetFeedbackInteractor from
'../../../domain/interactor/feedback/GetFeedbackInteractor'
import AddFeedbackInteractor from
'../../../domain/interactor/feedback/AddFeedbackInteractor'
import FeedbackParam from '../../../domain/param/FeedbackParam'
import { NotifyActions } from '../../../actions'
import store from '../../../store'

export default class FeedbackPresenter {
  constructor (container) {
    this.getFeedbackInteractor =
      new GetFeedbackInteractor(container.get('HRBenefitsClient'))

    this.addFeedbackInteractor =
      new AddFeedbackInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getFeedback () {
    this.view.showLoading()
    this.getFeedbackInteractor.execute()
      .subscribe(feedback => {
          this.view.showFeedback(feedback)
        }, e => {
      })
  }

  addFeedback (feedbackId, feedback) {
    this.view.showLoading()
    this.addFeedbackInteractor.execute(FeedbackParam(feedbackId, feedback))
      .subscribe(
        data => {
          store.dispatch(NotifyActions.addNotify({
              title : 'Feedback',
              message : data.message,
              type : 'success',
              duration : 2000
            })
          )
          this.view.onSuccessSubmit(true)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
              title : 'Feedback',
              message : error.message,
              type : 'warning',
              duration : 2000
            })
          )
          this.view.onSuccessSubmit(true)
          this.view.hideLoading()
      }
    )
  }
}
