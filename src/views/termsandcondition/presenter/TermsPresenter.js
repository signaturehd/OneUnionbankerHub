import VerifyTermsAndConditionInteractor from '../../../domain/interactor/user/VerifyTermsAndConditionInteractor'

export default class TermsPresenter {
  constructor (container) {
    this.verifyTermsAndConditionInteractor = new VerifyTermsAndConditionInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  agreeTerms () {
    this.verifyTermsAndConditionInteractor.execute()
      .subscribe(
        data => {
          this.view.hideLoading()
        },
        error => {
          this.view.hideLoading()
        }
      )
  }
}
