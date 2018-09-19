import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import { Observable } from 'rxjs'

import GetAffirmationStatusInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'

export default class AffirmDocumentPresenter {
  constructor (container) {
    this.getAffirmationStatusInteractor =
      new GetAffirmationStatusInteractor(container.get('HRBenefitsClient'))
    this.getAffirmationPdf = container.get('FileClient')
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

  getAffirmationPdfView (link, token) {
    this.getTransactionImage.get('v1/uploads?folder=attachments', {
      headers: {
        token: token,
        file: link,
      },
      responseType : 'blob'
    })
  }
}
