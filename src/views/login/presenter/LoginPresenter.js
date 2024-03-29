import LoginInteractor from '../../../domain/interactor/user/LoginInteractor'
import RequestEmailVerificationInteractor from '../../../domain/interactor/user/RequestEmailVerificationInteractor'
import LoginParam from '../../../domain/param/LoginParam'
import RequestNewPasswordInteractor from '../../../domain/interactor/user/RequestNewPasswordInteractor'
import RequestUnlockPinInteractor from '../../../domain/interactor/user/RequestUnlockPinInteractor'
import RequestUnlockAccountInteractor from '../../../domain/interactor/user/RequestUnlockAccountInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import moment from 'moment'

export default class LoginPresenter {
  constructor (container) {
    this.loginInteractor = new LoginInteractor(container.get('HRBenefitsClient'))
    this.requestEmailVerificationInteractor = new RequestEmailVerificationInteractor(container.get('HRBenefitsClient'))
    this.requestNewPasswordInteractor = new RequestNewPasswordInteractor(container.get('HRBenefitsClient'))
    this.requestUnlockPinInteractor = new RequestUnlockPinInteractor(container.get('HRBenefitsClient'))
    this.requestUnlockAccountInteractor = new RequestUnlockAccountInteractor(container.get('HRBenefitsClient'))
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

  /* Unlock Profile */

  requestUnlockPin (empId, date) {
    this.view.showResetLoader()
    this.requestUnlockPinInteractor.execute (empId, moment(date).format('YYYY-MM-DD'))
    .subscribe(data => {
      this.view.hideResetLoader()
      this.view.hideHelpDeskComponent(data)
    }, error => {
      this.view.hideResetLoader()
    })
  }

  /* Unlock my Account */

  requestUnlockAccount (empId, date) {
    this.view.showResetLoader()
    this.requestUnlockAccountInteractor.execute(empId, moment(date).format('YYYY-MM-DD'))
    .subscribe(data => {
      this.view.hideResetLoader()
      this.view.hideHelpDeskComponent(data)
    }, error => {
      this.view.hideResetLoader()
    })
  }

  /* Request OTP for reseting password */

  requestUnlockAccount (empId, date) {
    this.view.showResetLoader()
    this.requestUnlockAccountInteractor.execute(empId, moment(date).format('YYYY-MM-DD'))
    .subscribe(data => {
      this.view.hideResetLoader()
      this.view.showNotificationMessage(data)
      this.view.hideHelpDeskComponent(data)
    }, error => {
      this.view.hideResetLoader()
    })
  }

  /* Request OTP for reseting password */

  requestEmailVerification (empId, date, password1, password2) {
    if (empId === '') {
        store.dispatch(NotifyActions.addNotify({
          title : 'Security',
          message : 'Employee ID is required ',
          type: 'warning',
          duration : 10000,
        })
      )
    } else if(date === '') {
        store.dispatch(NotifyActions.addNotify({
          title : 'Security',
          message : 'Date Field is required ',
          type: 'warning',
          duration : 10000,
        })
      )
    } else if (password1 === '') {
        store.dispatch(NotifyActions.addNotify({
          title : 'Security',
          message : 'Password is required ',
          type: 'warning',
          duration : 10000,
        })
      )
    } else if (password2 === '') {
        store.dispatch(NotifyActions.addNotify({
          title : 'Security',
          message : 'Confirm password is required ',
          type: 'warning',
          duration : 10000,
        })
      )
    } else {
      this.view.showResetLoader()
      this.requestEmailVerificationInteractor.execute(empId, moment(date).format('YYYY-MM-DD'))
      .subscribe(data => {
        this.view.hideResetLoader()
        this.view.showNotificationMessage(data)
      }, error => {
        this.view.hideResetLoader()
        this.view.showGetOtpModal(error)
      })
    }
  }

  /* Reset Old Password */

  requestNewPassword (otp, date, empId, password1, password2) {
    this.view.showResetLoader()
    this.requestNewPasswordInteractor.execute(otp, date, empId, password2)
    .subscribe(data => {
      this.view.hideResetLoader()
      this.view.hideHelpDeskComponent(data)
    }, error => {
      this.view.hideResetLoader()
    })
  }
}
