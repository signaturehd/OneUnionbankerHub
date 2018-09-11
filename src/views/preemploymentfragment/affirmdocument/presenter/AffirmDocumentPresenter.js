import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetAffirmationStatusInteractor from
  '../../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'

export default class AffirmDocumentPresenter {
  constructor (container) {
    this.getAffirmationStatusInteractor =
      new GetAffirmationStatusInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getAffirmationsStatus () {
    this.getAffirmationStatusInteractor.execute()
    .subscribe(data => {
      this.view.checkedAffirmationPreEmploymentStatus()
    }, error => {

    })
  }

}
