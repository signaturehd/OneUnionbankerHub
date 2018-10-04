import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetOnboardingPdfInteractor from
'../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class PersonnelSignaturePresenter {
  constructor (container) {
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {
    this.getOnboardingPdfInteractor.execute(link)
    .subscribe(data => {
      this.view.showAttachments(data)
    }, error => {
    })
  }

  addPersonnelSignature (personnelId, personnelAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(personnelId, personnelAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }
}
