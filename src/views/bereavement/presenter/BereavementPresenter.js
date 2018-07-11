// redux
import store from '../../../store'
import { NotifyActions } from '../../../actions'

// Interactors
import GetBereavementValidateInteractor from '../../../domain/interactor/bereavement/GetBereavementValidateInteractor'
import AddBereavementInteractor from '../../../domain/interactor/bereavement/AddBereavementInteractor'

// Params
import addBereavementParam from '../../../domain/param/AddBereavementParam'

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
      })
  }

  addBereavement (
    dependentId,
    objectDate,
    objectFuneral,
    objectMemorial,
    file) {
    this.view.showCircularLoader()
    this.addBereavementInteractor.execute(addBereavementParam(
      dependentId,
      objectDate,
      objectFuneral,
      objectMemorial,
      file
      )
    )
      .subscribe(resp => {
        this.view.noticeOfUndertaking(resp)
        this.view.hideCircularLoader()
        }, e => {
          this.view.noticeResponse(e)
          this.view.hideCircularLoader()
      })
  }

}
