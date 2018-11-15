import RequestOtpVerificationInteractor from '../../../domain/interactor/user/RequestOtpVerificationInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class ResetPasswordPresenter {
  constructor (container) {
    this.requestOtpVerificationInteractor = new RequestOtpVerificationInteractor(container.get('HRBenefitsClient'))
  }

  setView(view) {
    this.view = view
  }

  requestOtpVerification () {
    this.view.showCircularLoader()
    this.requestOtpVerificationInteractor.execute()
    .subscribe(data => {
      this.view.showOtpResponse(data.message)
      this.view.hideCircularLoader()
    }, error => {
    })
  }
}
