import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class NbiClearancePresenter {
  constructor (container) {
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
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

  getOnboardingAttachments (attachments) {
    this.view.showCircularLoader()
    this.getOnboardingAttachmentsInteractor.execute(attachments)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showAttachmentsFileView(data)
    }, error => {
      store.dispatch(NotifyActions.resetNotify())
      this.view.hideCircularLoader()
    })
  }

  getSelectedAttachments (array) {
    array.map((resp, key) =>
      resp.url.map((resp1) =>
        this.getOnboardingAttachments(resp1)
      )
    )
  }
}
