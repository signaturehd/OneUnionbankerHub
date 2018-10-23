import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetBspCertificatePdfViewInteractor from
'../../../../domain/interactor/preemployment/bspcertification/GetBspCertificatePdfViewInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'

export default class PagIbigPresenter {
  constructor (container) {
    this.getBspPdf = new GetBspCertificatePdfViewInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {
    this.view.showDocumentLoader()
    this.getBspPdf.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
      this.view.hideDocumentLoader()
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  uploadPagibigForm (pagibigId, pagibigAttachment) {
    this.view.showDocumentLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(pagibigId, pagibigAttachment))
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideDocumentLoader()
      this.view.noticeResponseResp(error)
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
