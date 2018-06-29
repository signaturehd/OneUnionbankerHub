import AddEducationAidInteractor from '../../../domain/interactor/educationAid/AddEducationAidInteractor'
import validateAidInteractor from '../../../domain/interactor/educationAid/validateAidInteractor'
import educationAidParam from '../../../domain/param/AddEducationAidParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class EducationAidPresenter {

 constructor (container) {
   this.validateAidInteractor = new validateAidInteractor(container.get('HRBenefitsClient'))
   this.addEducationAidInteractor = new AddEducationAidInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addEducationAid (
   courseText,
   academicYearText,
   semesterText,
   gwaText,
   tuitionFeeText,
   registrationFeeText,
   schoolId,
   fileAttachments) {
  this.addEducationAidInteractor.execute(educationAidParam(
    courseText,
    academicYearText,
    semesterText,
    gwaText,
    tuitionFeeText,
    registrationFeeText,
    schoolId,
    fileAttachments
    )
  )
  this.view.showCircularLoader()
   .subscribe(educationAid => {
     this.view.noticeOfUndertaking(educationAid)
     this.view.hideCircularLoader()
   }, e => {
     this.view.noticeResponse(e)
     this.view.hideCircularLoader()
   })
 }

 validateAid () {
   this.validateAidInteractor.execute()
     .subscribe(
       educationAid => {
         this.view.setEducationAid(educationAid)
       },
       error => {
      }
   )
 }
}
