import ValidateAccountNumberInteractor from '../../../domain/interactor/account/ValidateAccountNumberInteractor'
import GetAccountNumberInteractor from '../../../domain/interactor/account/GetAccountNumberInteractor'
import GetReleasingCentersInteractor from '../../../domain/interactor/rds/GetReleasingCentersInteractor'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'

export default class BenefitsPresenter {
  constructor (container) {
    this.getAccountNumberInteractor =
      new GetAccountNumberInteractor(container.get('HRBenefitsClient'))

    this.validateAccountNumberInteractor =
      new ValidateAccountNumberInteractor(container.get('HRBenefitsClient'));

    this.getReleasingCentersInteractor =
      new GetReleasingCentersInteractor(container.get('HRBenefitsClient'))

    this.getManagersCheckInteractor =
      new GetManagersCheckInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getReleasingCenters () {
    this.view.showLoading()
    this.getReleasingCentersInteractor.execute()
      .subscribe(releasingCenters => {
        this.view.hideLoading();
        this.view.showReleasingCenters(releasingCenters)
      }, e => {
        this.view.hideLoading()
        // TODO prompt generic error
      })
  }

  validateFabToShow () {
    const isManagersCheck = this.getManagersCheckInteractor.execute()

    if (isManagersCheck) {
      // TODO get chosen releasing center then;
      // TODO show releasing centers if there's no releasing center chosen
    } else {
      const accountNumber = this.getAccountNumberInteractor.execute()

      if (!accountNumber) {
        this.view.showAccountNumberModal()
      }
    }
  }

  validateAccountNumber (accountNumber) {
    this.view.showLoading()
    this.validateAccountNumberInteractor.execute(accountNumber)
      .subscribe(resp => {
        this.view.hideLoading();
        this.view.onValidAccountNumber()
      }, error => {
        this.view.hideLoading()
        // TODO prompt generic error
      })
  }
}
