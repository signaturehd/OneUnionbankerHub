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

 addEducationAid (course, academicYear, semester, gwa, tuitionFee, registrationFee,
 schoolId, fileOR, fileCOG, fileRegForm) {
  this.addEducationAidInteractor.execute(educationAidParam(course, academicYear, semester, gwa, tuitionFee, registrationFee,
  schoolId, fileOR, fileCOG, fileRegForm))
   .subscribe(educationAid => {
    this.view.noticeOfUndertaking(educationAid)
   }, e => {
    this.view.noticeResponse(e)
   })
 }

 getEducationAid () {
   this.getEducationAidInteractor.execute()
     .subscribe(
       educationAid => {
         this.view.setEducationAid(educationAid)
       },
       error => {
         console.log('Error: getEducationAid (Presenter)')
       }
     )
 }
}
