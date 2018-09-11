import validateGroupAidInteractor from '../../../domain/interactor/educationAid/validateGroupAidInteractor'
import AddGroupAidInteractor from '../../../domain/interactor/educationAid/AddGroupAidInteractor'
import groupAidParam from '../../../domain/param/GroupAidParam'

export default class EducationGroupAidPresenter {

  constructor (container) {
    this.validateGroupAidInteractor =
      new validateGroupAidInteractor(container.get('HRBenefitsClient'))

    this.AddGroupAidInteractor =
      new AddGroupAidInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Add grant dependent */
   addGroupAid (
     dependentId,
     desiredAmount,
     effectiveDate,
     company,
     durationOfPaymentId,
     orDate,
     orNumber,
     attachments) {
       this.view.showCircularLoader()
       this.AddGroupAidInteractor.execute(groupAidParam(
         dependentId,
         desiredAmount,
         effectiveDate,
         company,
         durationOfPaymentId,
         orDate,
         orNumber,
         attachments))
    .subscribe(groupPlan => {
      this.view.hideCircularLoader()
      this.view.noticeOfUndertaking(groupPlan)
     }, e => {
      this.view.hideCircularLoader()
      this.view.noticeResponse(e)
     })
   }

  /* Types of Group */
  validateGroupAid () {
    this.view.showCircularLoader()
    this.validateGroupAidInteractor.execute()
    .map(data => {
      let dependentArray = []
      let attachmentArray = []
      let premiumArray = []

      data &&
      data.attachments.map((attachment, key) => {
        attachmentArray.push({
          name : attachment
        })
      })
      this.view.showAttachmentsMap(attachmentArray)
      this.view.showDependentMap(data.recipients)
      this.view.showPremiumMap(data.durationOfPremium)
    })
    .subscribe(
        grantPlan => {
          this.view.hideCircularLoader()
        },
        error => {
          this.view.navigate()
          this.view.hideCircularLoader()
        }
      )
  }
}
