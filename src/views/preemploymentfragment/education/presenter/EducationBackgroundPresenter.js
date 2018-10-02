import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import employeeSchoolInteractor from '../../../../domain/interactor/preemployment/education/GetEmployeeSchoolInteractor'
import schoolDataInteractor from '../../../../domain/interactor/preemployment/education/GetSchoolDataInteractor'
import addEducationSchoolInteractor from '../../../../domain/interactor/preemployment/education/AddEducationSchoolInteractor'
import putEducationSchoolInteractor from '../../../../domain/interactor/preemployment/education/PutEducationSchoolInteractor'

import addEducationParam from '../../../../domain/param/AddEmployeeEducationParam'
import putEducationParam from '../../../../domain/param/PutEmployeeEducationParam'

export default class EducationBackgroundPresenter {
  constructor (container) {
    this.employeeSchoolInteractor = new employeeSchoolInteractor(container.get('HRBenefitsClient'))
    this.schoolDataInteractor = new schoolDataInteractor(container.get('HRBenefitsClient'))
    this.addEducationSchoolInteractor = new addEducationSchoolInteractor(container.get('HRBenefitsClient'))
    this.putEducationSchoolInteractor = new putEducationSchoolInteractor(container.get('HRBenefitsClient'))
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
      error => {}
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

  addEducationSchool(
    schoolName,
    studentNo,
    startYear,
    endYear,
    term,
    degree,
    honor,
    course,
    address,
    isUpdated,
    torFormData) {
      this.view.showCircularLoader()
      this.addEducationSchoolInteractor.execute(addEducationParam(
        schoolName,
        studentNo,
        startYear,
        endYear,
        term,
        degree,
        honor,
        course,
        address,
        isUpdated,
        torFormData
      ))
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponseResp(data)
        }, error => {
          this.view.hideCircularLoader()
        }
      )
    }

    putEducationSchool(
      educId,
      schoolName,
      studentNo,
      startYear,
      endYear,
      term,
      degree,
      honor,
      course,
      address,
      isUpdated,
      torFormData) {
        this.view.showCircularLoader()
        this.putEducationSchoolInteractor.execute(putEducationParam(
          educId,
          schoolName,
          studentNo,
          startYear,
          endYear,
          term,
          degree,
          honor,
          course,
          address,
          isUpdated,
          torFormData
        ))
        .subscribe(
          data => {
            this.view.hideCircularLoader()
            this.view.noticeResponseResp(data)
          }, error => {
            this.view.hideCircularLoader()
          }
        )
      }
}
