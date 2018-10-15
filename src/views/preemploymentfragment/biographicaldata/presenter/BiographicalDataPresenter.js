import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class BiographicalDataPresenter {
  constructor (container) {
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
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

  addBiographicalData (bioId, bioAttachment) {
    this.view.showDocumentLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(bioId, bioAttachment))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(error)
    })
  }

  getOnboardingAttachments (attachments) {
    this.getOnboardingAttachmentsInteractor.execute(attachments)
    .subscribe(data => {
    }, error => {

    })
  }

  getSelectedAttachments (biographicalArray) {
    biographicalArray.map((resp, key) =>
      resp.url.map((resp1) =>
        this.getOnboardingAttachments(resp)
      )
    )
  }
}
