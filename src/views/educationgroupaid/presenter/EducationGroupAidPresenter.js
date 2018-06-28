import validateGrantPlanInteractor from '../../../domain/interactor/education/validateGrantPlanInteractor'
import addGrantPlanInteractor from '../../../domain/interactor/education/addGrantPlanInteractor'
import grantPlanParam from '../../../domain/param/GrantPlanParam'

export default class EducationGroupAidPresenter {
  constructor (container) {
    this.validateGrantPlanInteractor =
      new validateGrantPlanInteractor(container.get('HRBenefitsClient'))
    this.addGrantPlanInteractor =
      new addGrantPlanInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
  this.view = view
  }

  /* Add grant dependent */
   addGrantPlan (grantId, file) {
    this.addGrantPlanInteractor.execute(grantPlanParam(grantId, file))
     .subscribe(grantPlan => {
      this.view.noticeOfUndertaking(grantPlan)
     }, e => {
      this.view.noticeResponse(e)
     })
   }


  /* Types of Grant */
  validateGrantPlan () {
    this.view.showCircularLoader()
    this.validateGrantPlanInteractor.execute()
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
