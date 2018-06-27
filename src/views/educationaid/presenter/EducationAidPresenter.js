
import GetEducationAidInteractor from '../../../domain/interactor/educationAid/GetEducationAidInteractor'
import AddEducationAidInteractor from '../../../domain/interactor/educationAid/AddEducationAidInteractor'

import addEducationAidParam from '../../../domain/param/AddEducationAidParam'

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

 addEducationAid (course, academicYear, semester, gwa, tuitionFee, registrationFee,
 schoolId, attachments) {
  this.view.showCircularLoader()
  this.addEducationAidInteractor.execute(
    addEducationAidParam(
      course,
      academicYear,
      semester,
      gwa,
      tuitionFee,
      registrationFee,
      schoolId,
      attachments))
      .subscribe(
        data => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Education Aid',
            message : data.message,
            type : 'success',
            duration : 2000
          })
         )
         this.view.hideCircularLoader()
         this.view.noticeOfUndertaking(true)
         this.view.noticeOfUndertakingForm(data)
        },
        error => {
          this.view.hideCircularLoader()
        }
      )
    }

}
