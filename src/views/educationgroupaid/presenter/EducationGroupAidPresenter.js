import validateGroupAidInteractor from '../../../domain/interactor/educationAid/validateGroupAidInteractor'
import addGroupAidInteractor from '../../../domain/interactor/educationAid/AddEducationAidInteractor'
import groupAidParam from '../../../domain/param/GroupAidParam'

export default class EducationGroupAidPresenter {

  constructor (container) {
    this.validateGroupAidInteractor =
      new validateGroupAidInteractor(container.get('HRBenefitsClient'))

    this.addGroupAidInteractor =
      new addGroupAidInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Add grant dependent */
   addGroupAid (grantId, file) {
    this.addGroupAidInteractor.execute(groupAidParam(grantId, file))
     .subscribe(grantPlan => {
      this.view.noticeOfUndertaking(grantPlan)
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
