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
<<<<<<< HEAD
    this.view.showLoading();

=======
    this.view.showLoading()
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
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
<<<<<<< HEAD
    this.view.showLoading();

=======
    this.view.showLoading()
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
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
