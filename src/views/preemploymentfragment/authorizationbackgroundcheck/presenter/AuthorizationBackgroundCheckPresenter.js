
import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'

export default class AuthorizationBackgroundCheckPresenter {
  constructor (container) {
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
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

}
