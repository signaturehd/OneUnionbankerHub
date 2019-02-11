import { NotifyActions, LoginActions } from '../../../actions'
import store from '../../../store'
import GenericGetNEOStatusInteractor from '../../../domain/interactor/neo/GenericGetNEOStatusInteractor'
import GenericPostNEOStatusInteractor from '../../../domain/interactor/neo/GenericPostNEOStatusInteractor'

export default class NewEmployeeHirePresenter {
  constructor (container) {
    this.genericGetNEOStatusInteractor = new GenericGetNEOStatusInteractor(container.get('HRBenefitsClient'))
    this.genericPostNEOStatusInteractor = new GenericPostNEOStatusInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getNEOStatus () {
    const neoStatus = this.genericGetNEOStatusInteractor.execute()
    console.log(neoStatus)
    this.view.getNEOStatus(neoStatus)
  }

  setNEOStatus (status) {
    this.genericPostNEOStatusInteractor.execute(status)
  }
}
