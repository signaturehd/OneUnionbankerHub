import CalamityInteractor from '../../../domain/interactor/calamity/CalamityInteractor'

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
         console.log("validateCalamityAssistance - Presenter")
      }
   )
 }

}
