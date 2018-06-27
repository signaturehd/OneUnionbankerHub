import validateGrantPlanInteractor from '../../../domain/interactor/education/validateGrantPlanInteractor'

export default class EducationGrantPlanPresenter {
  constructor (container) {
    this.validateGrantPlanInteractor =
      new validateGrantPlanInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
  this.view = view
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
