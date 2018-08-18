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
     attachments) {
       this.view.showCircularLoader()
       this.AddGroupAidInteractor.execute(groupAidParam(
         dependentId,
         desiredAmount,
         effectiveDate,
         company,
         durationOfPaymentId,
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
      data.recipients.map((dependent, key) => {
        dependentArray.push({
          id : dependent.id,
          name : dependent.name,
          months : dependent.months
        })
      })
      data &&
      data.durationOfPremium.map((premium, key) => {
        premiumArray.push({
          id : premium.id,
          months : premium.months,
          paymentDuration : premium.paymentDuration
        })
      })
      data &&
      data.attachments.map((attachment, key) => {
        attachmentArray.push({
          name : attachment
        })
      })
      this.view.showAttachmentsMap(attachmentArray)
      this.view.showValidatedGroupAid(data)
      this.view.showDependentMap(dependentArray)
      this.view.showPremiumMap(premiumArray)
    })
    .subscribe(
        grantPlan => {
          this.view.hideCircularLoader()
        },
        error => {
          this.view.hideCircularLoader()
        }
      )
  }
}
