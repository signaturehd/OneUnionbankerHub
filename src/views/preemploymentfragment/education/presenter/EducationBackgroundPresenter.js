import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import EmployeeSchoolInteractor from '../../../../domain/interactor/preemployment/education/GetEmployeeSchoolInteractor'
import SchoolDataInteractor from '../../../../domain/interactor/preemployment/education/GetSchoolDataInteractor'
import AddEducationSchoolInteractor from '../../../../domain/interactor/preemployment/education/AddEducationSchoolInteractor'
import PutEducationSchoolInteractor from '../../../../domain/interactor/preemployment/education/PutEducationSchoolInteractor'
import GetSchoolRecordVerificationFormInteractor from '../../../../domain/interactor/preemployment/education/GetSchoolRecordVerificationFormInteractor'
import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'

import addEducationParam from '../../../../domain/param/AddEmployeeEducationParam'
import putEducationParam from '../../../../domain/param/PutEmployeeEducationParam'

export default class EducationBackgroundPresenter {
  constructor (container) {
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
    this.employeeSchoolInteractor = new EmployeeSchoolInteractor(container.get('HRBenefitsClient'))
    this.schoolDataInteractor = new SchoolDataInteractor(container.get('HRBenefitsClient'))
    this.addEducationSchoolInteractor = new AddEducationSchoolInteractor(container.get('HRBenefitsClient'))
    this.putEducationSchoolInteractor = new PutEducationSchoolInteractor(container.get('HRBenefitsClient'))
    this.getSchoolRecordVerificationFormInteractor = new GetSchoolRecordVerificationFormInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {
    this.getOnboardingPdfInteractor.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
      this.view.hideDocumentLoader()
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  getSchoolRecordVerificationForm (link) {
    this.getSchoolRecordVerificationFormInteractor.execute(link)
    .subscribe(data => {
      this.view.showPdfFileUrl(data.url)
    }, error =>{
      this.view.hideDocumentLoader()
    })
  }

  getEmployeeSchool (pageNumber, find) {
    this.view.showCircularLoader()
    this.schoolDataInteractor.execute(pageNumber, find)
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
