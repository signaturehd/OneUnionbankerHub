import VerifyOtpInteractor from '../../../domain/interactor/user/VerifyOtpInteractor'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
import ResendOtpInteractor from '../../../domain/interactor/user/ResendOtpInteractor'
import OtpParam from '../../../domain/param/OtpParam'
import ResendOtpParam from '../../../domain/param/ResendOtpParam'

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
          this.view.onOtpSuccess()
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
          this.view.hideLoading()
        },
        error => {
          this.view.hideLoading()
        }
      )
  }
}
