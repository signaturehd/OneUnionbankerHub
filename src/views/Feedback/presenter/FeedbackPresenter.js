import GetFeedbackInteractor from '../../../domain/interactor/feedback/GetFeedbackInteractor'
import AddFeedbackInteractor from '../../../domain/interactor/feedback/AddFeedbackInteractor'
import FeedbackParam from '../../../domain/param/FeedbackParam'
import AddFeedbackInteractor from '../../../domain/interactor/feedback/AddFeedbackInteractor'
import addFeedbackParam from '../../../domain/param/addFeedbackParam'
import { NotifyActions } from '../../../actions'



export default class FeedbackPresenter {
  constructor (container) {
    this.getFeedbackInteractor = new GetFeedbackInteractor(container.get('HRBenefitsClient'))
    this.addFeedbackInteractor = new AddFeedbackInteractor(container.get('HRBenefitsClient'))
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
      .subscribe(feedback => {
          this.view.showFeedback(feedback)
        }, e => {
      })
  }

}
