// redux
import store from '../../../store'
import { NotifyActions } from '../../../actions'

// Interactors
import GetBereavementValidateInteractor from '../../../domain/interactor/bereavement/GetBereavementValidateInteractor'
import AddBereavementInteractor from '../../../domain/interactor/bereavement/AddBereavementInteractor'

// Params
import AddBereavementParam from '../../../domain/param/AddBereavementParam'

export default class BereavementPresenter {
  constructor (container) {
    this.getBereavementValidateInteractor =
      new GetBereavementValidateInteractor(container.get('HRBenefitsClient'))

    this.addBereavementInteractor =
      new AddBereavementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  validateBereavement () {
    this.getBereavementValidateInteractor.execute()
      .subscribe(resp => {
          this.view.showValidatedValue(resp)
          this.view.showDependentsValue(resp.dependents)
          this.view.hideCircularLoader()
        }, e => {
          this.view.navigate()
      })
  }

  addBereavement () {
    this.addBereavementInteractor.execute(AddBereavementParam)
      .subscribe(resp => {
          console.log(resp)
        }, e => {
          console.error(e)
      })
  }

}
