import RequestOtpVerificationInteractor from '../../../domain/interactor/user/RequestOtpVerificationInteractor'
import RequestEmailVerificationInteractor from '../../../domain/interactor/user/RequestEmailVerificationInteractor'
import RequestNewPasswordInteractor from '../../../domain/interactor/user/RequestNewPasswordInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class ResetPasswordPresenter {
  constructor (container) {
    this.requestOtpVerificationInteractor = new RequestOtpVerificationInteractor(container.get('HRBenefitsClient'))
    this.requestNewPasswordInteractor = new RequestNewPasswordInteractor(container.get('HRBenefitsClient'))
  }

  setView(view) {
    this.view = view
  }

  requestOtpVerification (token, otp) {
    this.view.showCircularLoader()
    this.requestOtpVerificationInteractor.execute(token, otp)
    .subscribe(data => {
      this.view.showOtpResponse(data, false, true)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
      this.view.showOtpResponse('', false, false)
    })
  }

  requestNewPassword (token, newPass, confirmPass, otp) {
    if(newPass === '') {
      this.view.showNewPassErrorMessage('Please check the fields')
    } else if (confirmPass ==='') {
      this.view.showConfirmPassErrorMessage('Please check the fields')
    } else {
      this.view.showPasswordCircularLoader()
      this.requestNewPasswordInteractor.execute(token, newPass, otp)
      .subscribe(data => {
        this.view.hidePasswordCircularLoader()
        this.view.showPasswordResponse(data, true)
      }, error => {
        this.view.hidePasswordCircularLoader()
      })
    }
  }
}
