import VerifyOtpInteractor from '../../../domain/interactor/user/VerifyOtpInteractor'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
import ResendOtpInteractor from '../../../domain/interactor/user/ResendOtpInteractor'
import OtpParam from '../../../domain/param/OtpParam'
import ResendOtpParam from '../../../domain/param/ResendOtpParam'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

export default class OtpPresenter {
  constructor (container) {
    this.verifyOtpInteractor = new VerifyOtpInteractor(container.get('HRBenefitsClient'))
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.resendOtpInteractor = new ResendOtpInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  verifyOtp (username, otp, transactionType) {
    this.view.showLoading()
    this.verifyOtpInteractor.execute(OtpParam(username, otp, transactionType))
      .subscribe(
        data => {
          this.view.hideLoading()
          this.view.onOtpSuccess(data.termsAndCondition)
        },
        error => {
          this.view.hideLoading()
          this.view.onOtpError()
        }
      )
  }

  resendOtp (username, transactionType) {
    this.view.showLoading()
    this.resendOtpInteractor.execute(ResendOtpParam(username, transactionType))
      .subscribe(
        data => {
          store.dispatch(NotifyActions.addNotify({
              title : 'Resend OTP',
              message : `${data.message  } Please wait.`,
              type : 'success',
              duration : 2000
            })
          )
          this.view.onResendSuccess()
          this.view.hideLoading()
        },
        error => {
          this.view.hideLoading()
        }
      )
  }
}
