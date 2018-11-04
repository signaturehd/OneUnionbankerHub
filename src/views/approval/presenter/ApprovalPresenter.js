import GetApprovalInteractor from '../../../domain/interactor/travel/GetApprovalInteractor'
import AddApprovalInteractor from '../../../domain/interactor/travel/AddApprovalInteractor'
import approvalParam from '../../../domain/param/TravelApprovalParam'
export default class ApprovalPresenter {
  constructor (container) {
    this.getApprovalInteractor = new GetApprovalInteractor(container.get('HRBenefitsClient'))
    this.addApprovalInteractor = new AddApprovalInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getApproval () {
    this.view.showCircularLoader()
    this.getApprovalInteractor.execute()
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.getApproval(travel)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }

  addApproval (
    requestId,
    isApprove,
    rejectedRemarks) {
    this.view.showSubmitLoader()
    this.addApprovalInteractor.execute(approvalParam(
      requestId,
      isApprove,
      rejectedRemarks
    ))
      .subscribe(approve => {
          this.view.hideSubmitLoader()
          this.view.noticeResponse(approve)
          this.view.resetValue()
        }, e => {
          this.view.hideSubmitLoader()
          // TODO prompt generic error
      })
  }
}
