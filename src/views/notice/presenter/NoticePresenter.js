import UpdateNoticeInteractor from '../../../domain/interactor/notice/UpdateNoticeInteractor'
import UpdateNoticeMplInteractor from '../../../domain/interactor/notice/UpdateNoticeMplInteractor'
import NoticeParam from '../../../domain/param/NoticeParam'
import NoticeMplParam from '../../../domain/param/NoticeMplParam'

export default class NoticePresenter {
  constructor (container) {
    this.updateNoticeInteractor = new UpdateNoticeInteractor(container.get('HRBenefitsClient'))
    this.updateNoticeMplInteractor = new UpdateNoticeMplInteractor(container.get('HRBenefitsClient'))
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

  updateNoticeMpl (transactionId, isAgree, benefitId, spouseAway) {
    this.view.showLoading()
    this.updateNoticeMplInteractor.execute(NoticeMplParam(transactionId, isAgree, benefitId, spouseAway))
     .subscribe(response => {
      this.view.hideLoading()
      this.view.onSuccess(response)
     }, e => {
      this.view.hideLoading()
      // TODO prompt generic error
     })
  }
}
