import validateGrantAidInteractor from '../../../domain/interactor/education/validateGrantAidInteractor'
import addGrantAidInteractor from '../../../domain/interactor/education/addGrantAidInteractor'
import grantAidParam from '../../../domain/param/grantAidParam'

export default class EducationGrantAidPresenter {
  constructor (container) {
    this.validateGrantAidInteractor =
      new validateGrantAidInteractor(container.get('HRBenefitsClient'))
    this.addGrantAidInteractor =
      new addGrantAidInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
  this.view = view
  }

  /* Add grant Personal */
   addGrantAid (grantId, file) {
    this.addGrantAidInteractor.execute(grantAidParam(grantId, file))
     .subscribe(grantAid => {
      this.view.noticeOfUndertaking(grantAid)
     }, e => {
      this.view.noticeResponse(e)
     })
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
