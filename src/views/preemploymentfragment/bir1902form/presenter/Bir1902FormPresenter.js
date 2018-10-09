import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class Bir1902FormPresenter {
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

  uploadBir1902Form (birId, birAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(birId, birAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }
}
