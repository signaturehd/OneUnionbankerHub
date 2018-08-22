
import store from '../../../store'
import { NotifyActions } from '../../../actions'

import addLeaveFilingParam from '../../../domain/param/AddLeaveFilingParam'
import LeaveFilingInteractor from '../../../domain/interactor/leavefiling/LeaveFilingInteractor'

export default class LeaveFilingPresenter {
  constructor (container) {
    this.leaveFilingInteractor = new LeaveFilingInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addLeaveFiling (
    type,
    dateFrom,
    dateTo,
    reason,
    remarks
  ) {

    this.view.showCircularLoader()
    this.leaveFilingInteractor.execute(
    addLeaveFilingParam(type,
      dateFrom,
      dateTo,
      reason,
      remarks)
    )
    .subscribe(data => {
      this.view.showSuccessResponse(data)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
