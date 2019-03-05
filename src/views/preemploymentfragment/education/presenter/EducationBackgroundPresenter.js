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

// Convert base64 to file object
function urltoFile(url, filename, fileType){
  return (fetch(url)
   .then((resp) => {return resp.arrayBuffer()})
   .then((base64) => {return new File([base64], filename, {type:fileType})})
  )
}

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
      store.dispatch(NotifyActions.resetNotify())
    })
  }

  getEditOnBoardingAttachments (link) {
    this.view.showRetrievingAttachmentsLoader()
    this.getOnboardingAttachmentsInteractor.execute(link)
    .subscribe(data => {
      const name = data && this.generateRandomName(data)
      const type = data && this.checkFileType(data)
      urltoFile(data, name, type)
      .then((file) => {
        this.view.showRetrieveAttachments(file, name, data)
      })
      this.view.showAttachmentsFileView(data)
      this.view.hideRetrievingAttachmentsLoader()
    }, error => {
      store.dispatch(NotifyActions.resetNotify())
      this.view.hideRetrievingAttachmentsLoader()
    })
  }

  checkFileType (file) {
    const str = file.split(';')
    const strImage = str[0].replace(/^data:/, '')

    return strImage
  }

  generateRandomName (resp) {
    const name = Math.random().toString(36).substring(2, 18)
    let fileExtension = this.checkFileType(resp).split('/')
    fileExtension = fileExtension[fileExtension.length - 1]
    return name + '.' + fileExtension
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
    store.dispatch(NotifyActions.resetNotify())
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
    educId,
    schoolName,
    studentNo,
    startYear,
    endYear,
    degree,
    honor,
    course,
    address,
    torFormData) {
      store.dispatch(NotifyActions.resetNotify())
      this.view.showCircularLoader()
      this.addEducationSchoolInteractor.execute(addEducationParam(
        educId,
        schoolName,
        studentNo,
        startYear,
        endYear,
        degree,
        honor,
        course,
        address,
        torFormData
      ))
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponseResp(data)
          this.view.resetMode()
        }, error => {
          this.view.hideCircularLoader()
          this.view.resetAttachmentUrl()
          this.view.callback()
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
    degree,
    honor,
    course,
    address,
    torFormData,
    attachmentFileObject) {
    store.dispatch(NotifyActions.resetNotify())
    let validateAttachments = false
    torFormData && torFormData.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )
    if(validateAttachments) {
      this.view.showCircularLoader()
      this.putEducationSchoolInteractor.execute(addEducationParam(
        educId,
        schoolName,
        studentNo,
        startYear,
        endYear,
        degree,
        honor,
        course,
        address,
        attachmentFileObject
      ))
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponseResp(data)
          this.view.resetMode()
          this.view.resetAttachmentUrl()
        }, error => {
          this.view.hideCircularLoader()
          this.view.resetAttachmentUrl()
          this.view.callback()
        }
      )
    } else {
      this.view.showCircularLoader()
      this.putEducationSchoolInteractor.execute(addEducationParam(
        educId,
        schoolName,
        studentNo,
        startYear,
        endYear,
        degree,
        honor,
        course,
        address,
        torFormData
      ))
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponseResp(data)
          this.view.resetAttachmentUrl()
          this.view.resetMode()
        }, error => {
          this.view.hideCircularLoader()
          this.view.resetAttachmentUrl()
          this.view.callback()
        }
      )
    }
  }

  removeSchool (id) {
    store.dispatch(NotifyActions.resetNotify())
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
