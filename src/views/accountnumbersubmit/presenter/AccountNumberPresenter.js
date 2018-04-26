import ValidateAccountNumberInteractor from '../../../domain/interactor/account/ValidateAccountNumberInteractor'
import GetReleasingCentersInteractor from '../../../domain/interactor/rds/GetReleasingCentersInteractor'

export default class AccountNumberPresenter {
  constructor (container) {
    this.validateAccountNumberInteractor =
      new ValidateAccountNumberInteractor(container.get('HRBenefitsClient'))

    this.getReleasingCentersInteractor =
      new GetReleasingCentersInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getReleasingCenters () {
    this.view.showLoading()
    this.getReleasingCentersInteractor.execute()
      .subscribe(releasingCenters => {
        this.view.hideLoading()
        this.view.showReleasingCenters(releasingCenters)
      }, e => {
        this.view.hideLoading()
        // TODO prompt generic error
      })
  }

  validateAccountNumber (accountNumber) {
    this.view.showLoading()
    this.validateAccountNumberInteractor.execute(accountNumber)
      .subscribe(resp => {
        this.view.hideLoading()
        this.view.onValidAccountNumber()
      }, error => {
        this.view.hideLoading()
        // TODO prompt generic error
      })
  }
}
