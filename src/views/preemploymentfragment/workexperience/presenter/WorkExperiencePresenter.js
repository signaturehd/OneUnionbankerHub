import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetWorkExperienceInteractor from '../../../../domain/interactor/preemployment/workexperience/GetWorkExperienceInteractor'
import GetWorkExperienceFormInteractor from '../../../../domain/interactor/preemployment/workexperience/GetWorkExperienceFormInteractor'
import AddWorkExperienceInteractor from '../../../../domain/interactor/preemployment/workexperience/AddWorkExperienceInteractor'
import PutWorkExperienceInteractor from '../../../../domain/interactor/preemployment/workexperience/PutWorkExperienceInteractor'
import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'

import addWorkExperienceParam from '../../../../domain/param/AddWorkExperienceParam'
import putWorkExperienceParam from '../../../../domain/param/PutWorkExperienceParam'

export default class WorkExperiencePresenter {
  constructor (container) {
    this.workExperienceInteractor = new GetWorkExperienceInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.getWorkExperienceFormInteractor = new GetWorkExperienceFormInteractor(container.get('HRBenefitsClient'))
    this.addWorkExperienceInteractor = new AddWorkExperienceInteractor(container.get('HRBenefitsClient'))
    this.putWorkExperienceInteractor = new PutWorkExperienceInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingAttachments (link) {
    this.getOnboardingAttachmentsInteractor.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
      this.view.hideDocumentLoader()
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  getWorkExperienceForm () {
    this.getWorkExperienceFormInteractor.execute()
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.showPdfFileUrl(data)
    }, error =>{
      this.view.hideDocumentLoader()
    })
  }

  getWorkExperience () {
    this.view.showCircularLoader()
    this.workExperienceInteractor.execute()
    .subscribe(
        data => {
          this.view.checkedWorkExperience(data)
          this.view.hideCircularLoader()
        },
        error => {
          this.view.hideCircularLoader()
          // this.view.navigate()
       }
    )
  }

  addWorkExperience(
    companyName,
    address,
    position,
    description,
    contactNo,
    fromMonthName,
    fromYear,
    toMonthName,
    toYear) {
      this.view.showCircularLoader()
      this.addWorkExperienceInteractor.execute(addWorkExperienceParam(
        companyName,
        address,
        position,
        description,
        contactNo,
        fromMonthName,
        fromYear,
        toMonthName,
        toYear
      ))
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponseResp(data)
          this.getWorkExperience()
        }, error => {
          this.view.hideCircularLoader()
        }
      )
    }

    putWorkExperience (
      workExpId,
      companyName,
      address,
      position,
      description,
      contactNo,
      fromMonthName,
      fromYear,
      toMonthName,
      toYear) {
        this.view.showCircularLoader()
        this.putWorkExperienceInteractor.execute(putWorkExperienceParam(
          workExpId,
          companyName,
          address,
          position,
          description,
          contactNo,
          fromMonthName,
          fromYear,
          toMonthName,
          toYear
        ))
        .subscribe(
          data => {
            this.view.hideCircularLoader()
            this.view.noticeResponseResp(data)
            this.getWorkExperience()
          }, error => {
            this.view.hideCircularLoader()
          }
        )
      }
}
