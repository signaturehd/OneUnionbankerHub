import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/GetEmployeeSSSInteractor'

export default class SSSPresenter {
  constructor (container) {
    this.getEmployeeSSSInteractor = new GetEmployeeSSSInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getEmployeeSSS () {
    this.getEmployeeSSSInteractor.execute()
    .subscribe(data => {
      this.view.showEmployeeSSSData(data)
    }, error => {

    })
  }

}
