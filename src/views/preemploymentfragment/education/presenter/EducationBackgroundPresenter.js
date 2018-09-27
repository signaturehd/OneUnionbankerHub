import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import employeeSchoolInteractor from '../../../../domain/interactor/preemployment/education/GetEmployeeSchoolInteractor'

export default class EducationBackgroundPresenter {
  constructor (container) {
    this.employeeSchoolInteractor = new employeeSchoolInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getEmployeeSchool () {
    this.view.showCircularLoader()
    this.employeeSchoolInteractor.execute()
    .subscribe(
        data => {
          this.view.checkedEducationData(data)
          this.view.hideCircularLoader()
        },
        error => {
          this.view.hideCircularLoader()
          // this.view.navigate()
       }
    )
  }
  }
