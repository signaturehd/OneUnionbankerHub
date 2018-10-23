import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetEmployeeTinInteractor from '../../../../domain/interactor/preemployment/tin/GetEmployeeTinInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'
import AddEmployeeTinInteractor from '../../../../domain/interactor/preemployment/tin/AddEmployeeTinInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeTinParam from '../../../../domain/param/AddEmployeeTinParam'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class TinPresenter {
  constructor (container) {
    this.getEmployeeTinInteractor = new GetEmployeeTinInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeTinInteractor = new AddEmployeeTinInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getEmployeeTin () {
    this.getEmployeeTinInteractor.execute()
    .subscribe(data => {
      this.view.showEmployeeTinData(data)
    }, error => {

    })
  }

  saveEmployeeTin (tinInput) {
    this.view.showDocumentLoader()
    this.addEmployeeTinInteractor.execute(employeeTinParam(tinInput))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  uploadEmployeeTin (tinId, tinAttachment) {
    this.view.showDocumentLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(tinId, tinAttachment))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
      this.view.setTinAttachments()
    }, error => {
      this.view.hideDocumentLoader()
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
