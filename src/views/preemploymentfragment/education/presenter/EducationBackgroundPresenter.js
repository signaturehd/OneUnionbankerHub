import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import employeeSchoolInteractor from '../../../../domain/interactor/preemployment/education/GetEmployeeSchoolInteractor'
import schoolDataInteractor from '../../../../domain/interactor/preemployment/education/GetSchoolDataInteractor'

export default class EducationBackgroundPresenter {
  constructor (container) {
    this.employeeSchoolInteractor = new employeeSchoolInteractor(container.get('HRBenefitsClient'))
    this.schoolDataInteractor = new schoolDataInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getEmployeeSchool (pageNumber) {
    this.view.showCircularLoader()
    this.schoolDataInteractor.execute(pageNumber)
    .subscribe(
      data => {
        this.view.checkedSchoolData(data)
      },
      error => {

      }
    )
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
