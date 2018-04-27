import VerifyOtpInteractor from '../../../domain/interactor/user/VerifyOtpInteractor'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
import OtpParam from '../../../domain/param/OtpParam'

export default class OtpPresenter {
  constructor (container) {
    this.verifyOtpInteractor = new VerifyOtpInteractor(container.get('HRBenefitsClient'))
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
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
        }
      )
  }
}
