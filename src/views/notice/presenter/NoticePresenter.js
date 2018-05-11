import UpdateNoticeInteractor from '../../../domain/interactor/notice/UpdateNoticeInteractor'
import NoticeParam from '../../../domain/param/NoticeParam'

export default class NoticePresenter {
  constructor (container) {
    this.updateNoticeInteractor = new UpdateNoticeInteractor(container.get('HRBenefitsClient'))
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

}
