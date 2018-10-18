import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/GetEmployeeSSSInteractor'
import AddEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/AddEmployeeSSSInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeSSSParam from '../../../../domain/param/AddEmployeeSSSParam'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'

export default class SSSPresenter {
  constructor (container) {
    this.getEmployeeSSSInteractor = new GetEmployeeSSSInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeSSSInteractor = new AddEmployeeSSSInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnboardingAttachments (attachments) {
    this.view.showCircularLoader()
    this.getOnboardingAttachmentsInteractor.execute(attachments)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showAttachmentsFileView(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  getSelectedAttachments (sssArray) {
    sssArray.map((resp, key) =>
      resp.url.map((resp1) =>
        this.getOnboardingAttachments(resp1)
      )
    )
  }

  getEmployeeSSS () {
    this.getEmployeeSSSInteractor.execute()
    .subscribe(data => {
      this.view.showEmployeeSSSData(data)
    }, error => {

    })
  }

  saveEmployeeSSS (sssInput) {
    this.view.showDocumentLoader()
    this.addEmployeeSSSInteractor.execute(employeeSSSParam(sssInput))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(error)
    })
  }

  uploadEmployeeSSS (sssId, sssAttachment) {
    this.view.showDocumentLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(sssId, sssAttachment))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
      this.view.setSSSAttachments()
    }, error => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(error)
    })
  }

}
