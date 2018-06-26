import AddFeedbackInteractor from '../../../domain/interactor/feedback/AddBenefitFeedbackInteractor'

import store from '../../../actions'
import { NotifyActions } from '../../../actions'

import AddBenefitFeedbackInteractor from '../../../domain/param/AddBenefitFeedbackParam'

export default class BenefitFeedbackPresenter {
  constructor (container) {
    this.addBenefitFeedbackParam =
      new AddBenefitFeedbackInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addFeedback ( benefitId, rating, comment ) {
    addFeedbackInteractor.execute(addBenefitFeedbackParam( benefitId, rating, comment ))
      .subscribe(resp => {
        this.view.successFeedback(resp)
      }, e => {
        console.error(e)
      })
  }
}
