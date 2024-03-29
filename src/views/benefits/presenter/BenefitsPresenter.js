import ValidateAccountNumberInteractor from '../../../domain/interactor/account/ValidateAccountNumberInteractor'
import GetAccountNumberInteractor from '../../../domain/interactor/account/GetAccountNumberInteractor'
import ValidateReleasingCenterInteractor from '../../../domain/interactor/rds/ValidateReleasingCenterInteractor'
import GetReleasingCentersInteractor from '../../../domain/interactor/rds/GetReleasingCentersInteractor'
import AddReleasingCenterInteractor from '../../../domain/interactor/rds/AddReleasingCenterInteractor'
import GetManagersCheckInteractor from '../../../domain/interactor/user/GetManagersCheckInteractor'
import GetInformationInteractor from '../../../domain/interactor/user/GetInformationInteractor'
import GetCarValidateInteractor from '../../../domain/interactor/carlease/GetCarNewValidateInteractor'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class BenefitsPresenter {
  constructor (container) {
    this.getAccountNumberInteractor =
      new GetAccountNumberInteractor(container.get('HRBenefitsClient'))
    this.getInformationInteractor =
      new GetInformationInteractor(container.get('HRBenefitsClient'))

    this.validateReleasingCenterInteractor =
      new ValidateReleasingCenterInteractor(container.get('HRBenefitsClient'))

    this.validateAccountNumberInteractor =
      new ValidateAccountNumberInteractor(container.get('HRBenefitsClient'))

    this.getReleasingCentersInteractor =
      new GetReleasingCentersInteractor(container.get('HRBenefitsClient'))

    this.addReleasingCenterInteractor =
      new AddReleasingCenterInteractor(container.get('HRBenefitsClient'))

    this.getManagersCheckInteractor =
      new GetManagersCheckInteractor(container.get('HRBenefitsClient'))

    this.getCarValidateInteractor =
      new GetCarValidateInteractor(container.get('HRBenefitsClient'))
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

  getCarValidate () {
    this.view.showCircularLoader()
    this.getCarValidateInteractor.execute()
    .subscribe(
      validate => {
        this.view.hideCircularLoader()
        this.view.showCarValidated(validate)
      }, error => {
        this.view.hideCircularLoader()
        this.view.navigate()
      }
    )
  }

  setReleasingCenter (releasingCenter) {
    this.addReleasingCenterInteractor.execute(releasingCenter)
  }

  getAccountNumber () {
    const accountNumberPrefill = this.getAccountNumberInteractor.execute()
      this.view.showAccountNumberPrefill(accountNumberPrefill)
  }

  getProfile () {
    const employeeInformation = this.getInformationInteractor.execute()
      this.view.showGender(employeeInformation)
  }

  validateFabToShow () {
    const isManagersCheck = this.getManagersCheckInteractor.execute()
    if (isManagersCheck !== null) {
      if (isManagersCheck) {
        const releasingCenter = this.validateReleasingCenterInteractor.execute()
        if (!releasingCenter) {
          this.view.isAccountNumber(false)
        } this.view.isAccountOrRelasing(false)
        // TODO get chosen releasing center then;
        // TODO show releasing centers if there's no releasing center chosen
      } else {
        const accountNumber = this.getAccountNumberInteractor.execute()
        if (!accountNumber) {
          this.view.isAccountNumber(true)
        } this.view.isAccountOrRelasing(true)
      }
    } else {
    }
  }

  validateAccountNumber (accountNumber) {
    this.view.showLoaderValidatingAccountNumber()
    this.validateAccountNumberInteractor.execute(accountNumber)
      .subscribe(resp => {
        this.view.hideLoaderValidatingAccountNumber()
        this.view.onValidAccountNumber()
      }, error => {
        this.view.hideLoaderValidatingAccountNumber()
        // TODO prompt generic error
      })
  }
}
