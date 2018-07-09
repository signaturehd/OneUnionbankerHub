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
   addGroupAid (dependentId, desiredAmount, effectiveDate, company, durationOfPaymentId, file1, file2) {
    this.AddGroupAidInteractor.execute(groupAidParam(dependentId, desiredAmount, effectiveDate, company, durationOfPaymentId, file1, file2))
     .subscribe(groupPlan => {
      this.view.noticeOfUndertaking(groupPlan)
     }, e => {
      this.view.noticeResponse(e)
     })
   }

  /* Types of Group */
  validateGroupAid () {
    this.view.showCircularLoader()
    this.validateGroupAidInteractor.execute()
      .subscribe(
        grantPlan => {
          this.view.setGrantPlan(grantPlan)
          this.view.hideCircularLoader()
        },
        error => {
        }
      )
  }
}
