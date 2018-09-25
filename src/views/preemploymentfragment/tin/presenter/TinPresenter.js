import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetEmployeeTinInteractor from '../../../../domain/interactor/preemployment/tin/GetEmployeeTinInteractor'

export default class TinPresenter {
  constructor (container) {
    this.getEmployeeTinInteractor = new GetEmployeeTinInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  getEmployeeTin () {
    this.getEmployeeTinInteractor.execute()
    .subscribe(data => {
      this.view.showEmployeeTinData(data)
    }, error => {

    })
  }

}
