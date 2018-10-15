import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'

import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class SSSPresenter {
  constructor (container) {
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {
    this.view.showDocumentLoader()
    this.getOnboardingPdfInteractor.execute(link)
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.showPdfFileView(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  uploadPhilHealthForm (philId, philAttachment) {
    this.view.showDocumentLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(philId, philAttachment))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }
}
