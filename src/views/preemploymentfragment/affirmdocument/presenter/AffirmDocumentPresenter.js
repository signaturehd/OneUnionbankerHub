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

    this.postEnrollPinAffirmationsEmployment = container.get('HRBenefitsClient')
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
    })
  }

  postEnrollPinAffirmationsEmployment (pin) {
    this.view.showPinLoader(true)
    this.postEnrollPinAffirmationsEmployment.execute(pin)
      .subscribe(data => {
        this.voew.showPinLoader(false)
        this.view.noticeResponse(data)
      }, error => {

      })
  }
}
