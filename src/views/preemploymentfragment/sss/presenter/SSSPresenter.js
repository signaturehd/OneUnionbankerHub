import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/GetEmployeeSSSInteractor'
import AddEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/AddEmployeeSSSInteractor'
import employeeSSSParam from '../../../../domain/param/AddEmployeeSSSParam'

export default class SSSPresenter {
  constructor (container) {
    this.getEmployeeSSSInteractor = new GetEmployeeSSSInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeSSSInteractor = new AddEmployeeSSSInteractor(container.get('HRBenefitsClient'))
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

  addEmployeeSSS (
    sssInput,
    sssAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeSSSInteractor.execute(employeeSSSParam(
      sssInput,
      sssAttachment
      )
    )
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }

}
