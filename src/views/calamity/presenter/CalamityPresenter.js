import CalamityInteractor from '../../../domain/interactor/calamity/GetValidityCalamityInteractor'

export default class CalamityPresenter {

 constructor (container) {
   this.calamityInteractor = new CalamityInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 validateCalamityAssistance () {
   this.calamityInteractor.execute()
     .subscribe(
       calamityAssistance => {
         this.view.setValidateCalamityAssistance(calamityAssistance)
       },
       error => {

      }
   )
 }

}
