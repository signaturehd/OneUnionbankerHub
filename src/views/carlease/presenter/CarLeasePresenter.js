import GetCarNewValidateInteractor from '../../../domain/interactor/mpl/GetCarNewValidateInteractor'

import store from '../../../actions'
import { NotifyActions } from '../../../actions'

import addCarParam from '../../../domain/param/AddCarleaseRequestParam'

export default class CarLeasePresenter {
  constructor (container) {
    this.carNewValidateInteractor =
      new GetCarNewValidateInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getCarValidate () {
    this.view.hideCircularLoader()
    this.carNewValidateInteractor.execute()
      .do(data => this.view.showValidate(data))
      .do(data => this.view.hideCircularLoader(),
          data => this.view.hideCircularLoader())
      .subscribe()
  }
}
