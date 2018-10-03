import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/GetEmployeeSSSInteractor'
import AddEmployeeSSSInteractor from '../../../../domain/interactor/preemployment/sss/AddEmployeeSSSInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeSSSParam from '../../../../domain/param/AddEmployeeSSSParam'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class SSSPresenter {
  constructor (container) {
    this.getEmployeeSSSInteractor = new GetEmployeeSSSInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeSSSInteractor = new AddEmployeeSSSInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
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

  saveEmployeeSSS (sssInput) {
    this.view.showCircularLoader()
    this.addEmployeeSSSInteractor.execute(employeeSSSParam(sssInput))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }

  uploadEmployeeSSS (sssId, sssAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(sssId, sssAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(error)
    })
  }

}
