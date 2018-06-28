import GetEducationAidInteractor from '../../../domain/interactor/educationAid/GetEducationAidInteractor'
import AddEducationAidInteractor from '../../../domain/interactor/educationAid/AddEducationAidInteractor'
import educationAidParam from '../../../domain/param/AddEducationAidParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class EducationAidPresenter {

 constructor (container) {
   this.getEducationAidInteractor = new GetEducationAidInteractor(container.get('HRBenefitsClient'))
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

 getEducationAid () {
   this.getEducationAidInteractor.execute()
     .subscribe(
       educationAid => {
         this.view.setEducationAid(educationAid)
       },
       error => {
        }
     )
 }
}
