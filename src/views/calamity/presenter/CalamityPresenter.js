import CalamityInteractor from '../../../domain/interactor/calamity/GetValidityCalamityInteractor'
import AddCalamityInteractor from '../../../domain/interactor/calamity/AddCalamityAssistanceInteractor'
import calamityAssistanceParam from '../../../domain/param/AddCalamityAssistanceParam'

export default class CalamityPresenter {

 constructor (container) {
   this.calamityInteractor =
   new CalamityInteractor(container.get('HRBenefitsClient'))
   this.addCalamityInteractor =
   new AddCalamityInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 validateCalamityAssistance () {
   this.view.showCircularLoader()
   this.calamityInteractor.execute()
   .map(data => {
     let attachmentArray = []
     let calamityType = []
     const defaultAttachments = [
       {
         name: 'Barangay Certificate'
       }
     ]
     const defaultDamageProperty = [
       {
         name: 'Damage Property ' + 1
       }
     ]
     data &&
     data.map((resp, key) => {
       calamityType.push({
         id : resp.id,
         name : resp.description
       })
     })
     this.view.showCalamityTypeMap(calamityType)
     this.view.showAttachmentsMap(defaultAttachments)
     this.view.showDamagePropertyAttachments(defaultDamageProperty)
     this.view.showValidatedCalamity(data)
   })
     .subscribe(
       data => {
         this.view.hideCircularLoader()
       },
       error => {
         this.view.hideCircularLoader()
      }
   )
 }

 addCalamityAssistance (
   id,
   date,
   damageProperty,
   attachmentArray
 ) {
  this.view.showCircularLoader()
  this.addCalamityInteractor.execute(calamityAssistanceParam(
    id,
    date,
    damageProperty,
    attachmentArray
    )
  )
  .subscribe(calamityAssistance => {
     this.view.noticeOfUndertaking(calamityAssistance)
     this.view.hideCircularLoader()

   }, e => {
     this.view.noticeResponse(e)
     this.view.hideCircularLoader()
   })
 }

}
