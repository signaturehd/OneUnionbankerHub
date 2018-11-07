import LogoutInteractor from '../../../domain/interactor/user/LogoutInteractor'
import GetLibrariesInteractor from '../../../domain/interactor/user/GetLibrariesInteractor'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
// import GetWizardInteractor from '../../../domain/interactor/user/GetWizardInteractor'
// import SetWizardInteractor from '../../../domain/interactor/user/SetWizardInteractor'
import RelogInInteractor from '../../../domain/interactor/user/RelogInInteractor'
import GenericPinCodeInteractor from '../../../domain/interactor/pinCode/GenericPinCodeInteractor'

/* Preemployment Status */
import GetPreEmploymentStatusInteractor from
'../../../domain/interactor/preemployment/preemployment/GetPreEmploymentStatusInteractor'

import { NotifyActions, LoginActions } from '../../../actions'
import store from '../../../store'

export default class NavigationPresenter {
  constructor (container) {
    this.logoutInteractor = new LogoutInteractor(container.get('HRBenefitsClient'))
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.getLibrariesInteractor = new GetLibrariesInteractor(container.get('HRBenefitsClient'))
    // this.getWizardInteractor = new GetWizardInteractor(container.get('HRBenefitsClient'))
    // this.setWizardInteractor = new SetWizardInteractor(container.get('HRBenefitsClient'))
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
    this.relogInInteractor.execute()
    store.dispatch(LoginActions.showReloginModal(false))
  }

  getLibraries () {
    this.view.showLoading()
    this.getLibrariesInteractor.execute()
     .do(profile => this.view.showProfile(profile.employee))
     .do(profile => this.view.showPinIsValid(profile.hasPIN))
     .do(profile => this.view.isHasCOC(profile.hasCOC))
     .do(profile => this.view.hasFilledOutFunc(profile.hasFilledOut))
     .do(profile => this.view.isLineManagerData(profile.isLineManager))
      .subscribe(resp => {
        this.view.hideLoading()
      }, error => {
        this.view.hideLoading()
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
    this.getPreEmploymentStatusInteractor.execute()
    .subscribe(data => {
      this.view.showPreemploymentStatus(data && data)
      }, error => {
        this.view.showPreemploymentStatus(null)
        store.dispatch(NotifyActions.resetNotify())
    })
  }
}
