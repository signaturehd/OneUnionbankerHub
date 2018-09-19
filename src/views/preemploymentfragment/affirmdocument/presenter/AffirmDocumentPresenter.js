import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetAffirmationStatusInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'
import GetAffirmationPdfViewInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationPdfViewInteractor'

export default class AffirmDocumentPresenter {
  constructor (container) {
    this.getAffirmationStatusInteractor =
      new GetAffirmationStatusInteractor(container.get('HRBenefitsClient'))
    this.getAffirmationPdf = new GetAffirmationPdfViewInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getAffirmationsStatus () {
    this.getAffirmationStatusInteractor.execute()
    .subscribe(data => {
      this.view.checkedAffirmationPreEmploymentStatus(data)
    }, error => {
    })
  }

  getOnBoardingDocument (link) {

    this.getAffirmationPdf.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
    }, error => {
      console.log(error)
    })
  }
}
