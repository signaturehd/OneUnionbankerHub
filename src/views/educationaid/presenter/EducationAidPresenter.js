
import GetEducationAidInteractor from '../../../domain/interactor/educationAid/GetEducationAidInteractor'

export default class EducationAidPresenter {
 constructor (container) {
   this.getEducationAidInteractor = new GetEducationAidInteractor(container.get('HRBenefitsClient'))
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

}
