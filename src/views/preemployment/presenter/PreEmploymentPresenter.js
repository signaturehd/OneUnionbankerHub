import { NotifyActions } from '../../../actions'
import store from '../../../store'
import preEmploymentFormInteractor from '../../../domain/interactor/preemployment/preemployment/GetPreEmploymentFormInteractor'

export default class PreEmploymentPresenter {
  constructor (container) {
    this.preEmploymentFormInteractor = new preEmploymentFormInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPreEmploymentForm () {
    this.view.showCircularLoader()
    this.preEmploymentFormInteractor.execute()
    .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.checkedPreEmploymentForm(data)
        },
        error => {
          // this.view.navigate()
       }
    )
  }

}
