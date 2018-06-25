
import GetEducationAidInteractor from '../../../domain/interactor/educationAid/GetEducationAidInteractor'
// import dentalLoaParam from '../../../domain/param/DentalLoaParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class EducationAidPresenter {
 constructor (container) {
   this.getEducationAidInteractor = new GetEducationAidInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 getEducationAid () {
   this.view.showCircularLoader()
   this.getEducationAidInteractor.execute()

    .subscribe(response => {
      this.view.hideCircularLoader()
      this.view.getEducationAid(response)
    }, e => {
      this.view.hideCircularLoader()
    })
 }

}
