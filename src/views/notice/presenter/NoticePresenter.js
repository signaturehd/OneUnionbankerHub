import UpdateNoticeInteractor from '../../../domain/interactor/notice/UpdateNoticeInteractor'
import NoticeParam from '../../../domain/param/NoticeParam'
import SubmitPinInteractor from '../../../domain/interactor/compliances/SubmitPinInteractor'
import ValidateEmployeePinInteractor from '../../../domain/interactor/pinCode/ValidateEmployeePinInteractor'

export default class NoticePresenter {
  constructor (container) {
    this.updateNoticeInteractor = new UpdateNoticeInteractor(container.get('HRBenefitsClient'))
    this.submitPinInteractor = new SubmitPinInteractor(container.get('HRBenefitsClient'))
    this.validateEmployeePinInteractor = new ValidateEmployeePinInteractor(container.get('HRBenefitsClient'))
    // this.updateNoticeMplInteractor = new UpdateNoticeMplInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  updateNotice (transactionId, isAgree, benefitId) {
    this.view.showLoading()
    this.updateNoticeInteractor.execute(NoticeParam(transactionId, isAgree, benefitId))
     .subscribe(response => {
      this.view.hideLoading()
      this.view.onSuccess(response)
     }, e => {
      this.view.hideLoading()
      // TODO prompt generic error
     })
  }

  validateEmployeePin (code) {
    this.view.showCircularLoader()
    this.validateEmployeePinInteractor.execute(code)
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponseFunc(data, false)
        }, error => {
        this.view.hideCircularLoader()
    })
  }
}
