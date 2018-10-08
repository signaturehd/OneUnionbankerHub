import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetEmployeeTinInteractor from '../../../../domain/interactor/preemployment/tin/GetEmployeeTinInteractor'
import AddEmployeeTinInteractor from '../../../../domain/interactor/preemployment/tin/AddEmployeeTinInteractor'
import AddEmploymentRequirementInteractor from '../../../../domain/interactor/preemployment/requirement/AddEmploymentRequirementInteractor'
import employeeTinParam from '../../../../domain/param/AddEmployeeTinParam'
import employeeRequirementParam from '../../../../domain/param/AddEmployeeRequirementParam'

export default class TinPresenter {
  constructor (container) {
    this.getEmployeeTinInteractor = new GetEmployeeTinInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeTinInteractor = new AddEmployeeTinInteractor(container.get('HRBenefitsClient'))
    this.addEmployeeRequirementInteractor = new AddEmploymentRequirementInteractor(container.get('HRBenefitsClient'))
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

  saveEmployeeTin (tinInput) {
    this.view.showCircularLoader()
    this.addEmployeeTinInteractor.execute(employeeTinParam(tinInput))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  uploadEmployeeTin (tinId, tinAttachment) {
    this.view.showCircularLoader()
    this.addEmployeeRequirementInteractor.execute(employeeRequirementParam(tinId, tinAttachment))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

}
