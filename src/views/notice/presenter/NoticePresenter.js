import UpdateNoticeInteractor from '../../../domain/interactor/notice/UpdateNoticeInteractor'
import NoticeParam from '../../../domain/param/NoticeParam'
import SubmitPinInteractor from '../../../domain/interactor/compliances/SubmitPinInteractor'

export default class NoticePresenter {
  constructor (container) {
    this.updateNoticeInteractor = new UpdateNoticeInteractor(container.get('HRBenefitsClient'))
    this.submitPinInteractor = new SubmitPinInteractor(container.get('HRBenefitsClient'))
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

  submitPin (code) {
    this.view.showCircularLoader()
    this.submitPinInteractor.execute(code)
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponse(data, true)
        }, error => {
        this.view.hideCircularLoader()
    })
  }
}
