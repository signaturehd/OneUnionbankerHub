import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import biographicalFormInteractor from '../../../../domain/interactor/preemployment/biographical/GetBiographicalFormInteractor'

export default class BiographicalDataPresenter {
  constructor (container) {
    this.biographicalFormInteractor = new biographicalFormInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getBiographicalForm () {
    this.view.showCircularLoader()
    this.biographicalFormInteractor.execute()
    .subscribe(
        data => {
          this.view.checkedBiographicalDataForm(data)
          this.view.hideCircularLoader()
        },
        error => {
          // this.view.navigate()
       }
    )
  }
}
