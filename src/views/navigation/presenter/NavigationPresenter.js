import LogoutInteractor from '../../../domain/interactor/user/LogoutInteractor'
import GetLibrariesInteractor from '../../../domain/interactor/user/GetLibrariesInteractor'
// import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
// import GetWizardInteractor from '../../../domain/interactor/user/GetWizardInteractor'
// import SetWizardInteractor from '../../../domain/interactor/user/SetWizardInteractor'
import RelogInInteractor from '../../../domain/interactor/user/RelogInInteractor'
import GenericPinCodeInteractor from '../../../domain/interactor/pinCode/GenericPinCodeInteractor'

/* Preemployment Status */
import GetStatusInteractor from '../../../domain/interactor/preemployment/preemployment/GetStatusInteractor'
import GetPreEmploymentStatusInteractor from
'../../../domain/interactor/preemployment/preemployment/GetPreEmploymentStatusInteractor'

import { NotifyActions, LoginActions } from '../../../actions'
import store from '../../../store'

export default class NavigationPresenter {
  constructor (container) {
    this.logoutInteractor = new LogoutInteractor(container.get('HRBenefitsClient'))
    //this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.getLibrariesInteractor = new GetLibrariesInteractor(container.get('HRBenefitsClient'))
    // this.getWizardInteractor = new GetWizardInteractor(container.get('HRBenefitsClient'))
    // this.setWizardInteractor = new SetWizardInteractor(container.get('HRBenefitsClient'))
    this.getStatusInteractor = new GetStatusInteractor(container.get('HRBenefitsClient'))
    this.relogInInteractor = new  RelogInInteractor(container.get('HRBenefitsClient'))
    this.genericPinCodeInteractor = new GenericPinCodeInteractor(container.get('HRBenefitsClient'))
    this.getPreEmploymentStatusInteractor = new GetPreEmploymentStatusInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  logout () {
    this.logoutInteractor.execute()
      .subscribe(resp => {
        this.view.relogin()
      })
  }

  relogin () {
      this.view.hideCircularLoader()
      this.relogInInteractor.execute()
      store.dispatch(LoginActions.showReloginModal(false))
  }

  getLibraries () {
    this.view.showCircularLoader()
    this.getLibrariesInteractor.execute()
      .subscribe(resp => {
        this.view.hideCircularLoader()
        this.view.showAgreementStatus(resp.pensionAgreement)
        this.view.showProfile(resp)
        this.view.showPinIsValid(resp.hasPIN)
        this.view.isHasCOC(resp.hasCOC)
      }, e => {
        this.view.hideCircularLoader()
        this.view.showAgreementStatus(e.message.pensionAgreement)
        this.view.showProfile(e.message)
        this.view.showPinIsValid(e.message.hasPIN)
        this.view.isHasCOC(e.message.hasCOC)
        // TODO prompt generic error
      }
    )
  }

  postEnrollPin (id) {
   this.view.showCircularLoader()
    this.genericPinCodeInteractor.execute(id)
    .subscribe(data => {
      store.dispatch(NotifyActions.addNotify({
        title: 'Authentication',
        message : data.message,
        type : 'success',
        duration : 2000
        })
      )
      this.view.hideEnrollPin(1)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
  //
  // getWizard () {
  //   this.view.showWizard(this.getWizardInteractor.execute())
  // }
  //
  // setWizard (wizard) {
  //   this.setWizardInteractor.execute(wizard)
  //   // this.view.showWizard(wizard)
  // }

  // 123 = pre employment
  // 4 = post employment
  // 5 = hide both
  // 0 or empty string, also hide both and show benefits if employee is regular

  getPreEmploymentStatus () {
    const status = JSON.parse(this.getStatusInteractor.execute())
    this.view.showPreemploymentStatus(status && status)
  }
}
