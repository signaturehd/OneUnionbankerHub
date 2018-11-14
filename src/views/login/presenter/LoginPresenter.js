import LoginInteractor from '../../../domain/interactor/user/LoginInteractor'
import RequestEmailVerificationInteractor from '../../../domain/interactor/user/RequestEmailVerificationInteractor'
import LoginParam from '../../../domain/param/LoginParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import moment from 'moment'

export default class LoginPresenter {
  constructor (container) {
    this.loginInteractor = new LoginInteractor(container.get('HRBenefitsClient'))
    this.requestEmailVerificationInteractor = new RequestEmailVerificationInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  login (username, password, disabled) {
    this.view.disabledButton()
    this.loginInteractor.execute(LoginParam(username, password))
    .subscribe(
      data => {
        this.view.enabledButton()
        this.view.onLoginSuccess(data.message)
      },
      error => {
        this.view.onLoginError(error)
      }
    )
  }

  requestEmailVerification (empId, date) {
    this.view.showResetLoader()
    this.requestEmailVerificationInteractor.execute(empId, moment(date).format('YYYY-MM-DD'))
    .subscribe(data => {
      this.view.hideResetLoader()
      this.view.showNotificationMessage(data)
    }, error => {
      this.view.hideResetLoader()
    })
  }
}
