import CalamityInteractor from '../../../domain/interactor/calamity/GetValidityCalamityInteractor'
import AddCalamityInteractor from '../../../domain/interactor/calamity/AddCalamityAssistanceInteractor'
import calamityAssistanceParam from '../../../domain/param/AddCalamityAssistanceParam'

export default class CalamityPresenter {

 constructor (container) {
   this.calamityInteractor = new CalamityInteractor(container.get('HRBenefitsClient'))
   this.addCalamityInteractor = new AddCalamityInteractor(container.get('HRBenefitsClient'))
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

 addCalamityAssistance (
   calamityId,
   date,
   property,
   propertyDesc,
   propertyType,
   acquisitionValue,
   estimatedCost,
   fileAttachments) {
  this.addCalamityInteractor.execute(calamityAssistanceParam(
    calamityId,
    date,
    property,
    propertyDesc,
    propertyType,
    acquisitionValue,
    estimatedCost,
    fileAttachments
    )
  )
  this.view.showCircularLoader()
   .subscribe(calamityAssistance => {
     this.view.noticeOfUndertaking(calamityAssistance)
     this.view.hideCircularLoader()
   }, e => {
     this.view.noticeResponse(e)
     this.view.hideCircularLoader()
   })
 }

}
