import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import SchoolDataInteractor from '../../../../domain/interactor/preemployment/education/GetSchoolDataInteractor'
import AddEducationSchoolInteractor from '../../../../domain/interactor/preemployment/education/AddEducationSchoolInteractor'
import PutEducationSchoolInteractor from '../../../../domain/interactor/preemployment/education/PutEducationSchoolInteractor'
import GetSchoolRecordVerificationFormInteractor from '../../../../domain/interactor/preemployment/education/GetSchoolRecordVerificationFormInteractor'
import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'
import RemoveSchoolInteractor from '../../../../domain/interactor/preemployment/education/RemoveSchoolInteractor'

import addEducationParam from '../../../../domain/param/AddEmployeeEducationParam'
import putEducationParam from '../../../../domain/param/PutEmployeeEducationParam'

export default class EducationBackgroundPresenter {
  constructor (container) {
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.schoolDataInteractor = new SchoolDataInteractor(container.get('HRBenefitsClient'))
    this.addEducationSchoolInteractor = new AddEducationSchoolInteractor(container.get('HRBenefitsClient'))
    this.putEducationSchoolInteractor = new PutEducationSchoolInteractor(container.get('HRBenefitsClient'))
    this.getSchoolRecordVerificationFormInteractor = new GetSchoolRecordVerificationFormInteractor(container.get('HRBenefitsClient'))
    this.removeSchoolInteractor = new RemoveSchoolInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Get Method */

  getOnBoardingAttachments (link) {
    this.getOnboardingAttachmentsInteractor.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
      this.view.hideDocumentLoader()
    }, error => {
      this.view.hideDocumentLoader()
      this.view.showPdfFileView([])
    })
  }


  getEditOnBoardingAttachments (link) {
    this.view.showRetrievingAttachmentsLoader()
    this.getOnboardingAttachmentsInteractor.execute(link)
    .subscribe(data => {
      this.view.showEditModeAttachments(data)
      this.view.hideRetrievingAttachmentsLoader()
    }, error => {
      this.view.hideRetrievingAttachmentsLoader()
    })
  }

  checkAttachments (data) {
    data && data.tor.map((resp) =>
      this.getEditOnBoardingAttachments(resp)
    )
  }

  getSchoolRecordVerificationForm (link) {
    this.getSchoolRecordVerificationFormInteractor.execute(link)
    .subscribe(data => {
      this.view.showPdfFileUrl(data)
    }, error =>{
      this.view.hideDocumentLoader()
    })
  }

  getEmployeeSchool (pageNumber, find) {
    this.view.showCircularLoader()
    this.schoolDataInteractor.execute(pageNumber, find)
    .subscribe(
      data => {
        this.view.hideCircularLoader()
        this.view.checkedSchoolData(data)
      },
      error => {
        this.view.hideCircularLoader()
      }
    )
  }

  /* Post Method */

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
          this.view.resetMode()
        }, error => {
          this.view.hideCircularLoader()
        }
      )
    }

    /* Update Method */

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
        this.view.resetMode()
      }, error => {
        this.view.hideCircularLoader()
      }
    )
  }

  removeSchool (id) {
    this.view.showCircularLoader()
    this.removeSchoolInteractor.execute(id)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
      this.view.resetMode()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
