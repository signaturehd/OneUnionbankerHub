import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class NbiClearancePresenter {
  constructor (container) {
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addNbiClearance (nbiId, nbiAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(nbiId, nbiAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error.message)
    })
  }
}
