import CarNewValidateInteractor from '../../../domain/interactor/mpl/CarNewValidateInteractor'

import store from '../../../actions'
import { NotifyActions } from '../../../actions'

export default class CarLeasePresenter {
  constructor (container) {
    this.carNewValidateInteractor =
      new CarNewValidateInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getCarValidate () {
    this.view.showCircularLoader()
    this.carNewValidateInteractor.execute()
      .do(data => this.view.showValidate(data))
      .do(data => this.view.hideCircularLoader(),
          data => this.view.hideCircularLoader())
      .subscribe()
  }
}
