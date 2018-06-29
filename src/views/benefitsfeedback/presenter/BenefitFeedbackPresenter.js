import { NotifyActions } from '../../../actions'
import store from '../../../store'

import AddBenefitFeedbackInteractor from '../../../domain/interactor/feedback/AddBenefitFeedbackInteractor'

import addBenefitFeedbackParam from '../../../domain/param/AddBenefitFeedbackParam'

export default class BenefitFeedbackPresenter {
  constructor (container) {
    this.addBenefitFeedbackInteractor =
      new AddBenefitFeedbackInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addFeedback (benefitId, rating, comment) {
    this.addBenefitFeedbackInteractor.execute(addBenefitFeedbackParam(benefitId, rating, comment))
      .subscribe(resp => {
        store.dispatch(NotifyActions.addNotify({
            title: 'Benefit Feedback',
            message : resp.message,
            type : 'success',
            duration : 2000
          })
        )
        this.view.successFeedback(resp)
      }, e => {
        this.view.feedbackFailed()
      })
  }
}
