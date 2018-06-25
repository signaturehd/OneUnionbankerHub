import validateGrantAidInteractor from '../../../domain/interactor/education/validateGrantAidInteractor'

export default class EducationGrantAidPresenter {
  constructor (container) {
    this.validateGrantAidInteractor =
      new validateGrantAidInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
  this.view = view
  }

  /* Types of Grant */
  validateGrantAid () {
    this.view.showCircularLoader()
    this.validateGrantAidInteractor.execute()
      .subscribe(
        grantAid => {
          this.view.setGrantAid(grantAid)
          this.view.hideCircularLoader()
        },
        error => {
        }
      )
  }
}
