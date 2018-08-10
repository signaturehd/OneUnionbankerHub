import LogoutInteractor from '../../../domain/interactor/user/LogoutInteractor'
import GetLibrariesInteractor from '../../../domain/interactor/user/GetLibrariesInteractor'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
// import GetWizardInteractor from '../../../domain/interactor/user/GetWizardInteractor'
// import SetWizardInteractor from '../../../domain/interactor/user/SetWizardInteractor'
import RelogInInteractor from '../../../domain/interactor/user/RelogInInteractor'

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
      .subscribe(resp => {
        this.view.hideLoading()
      }, error => {
        this.view.hideLoading()
        // TODO prompt generic error
      }
    )
  }

  getProfile () {
   this.view.showLoading()

   this.getProfileInteractor.execute()
    .do(profile => this.view.showProfile(profile.employee))
    .subscribe(profile => {
     this.view.hideLoading()
    }, e => {
     this.view.hideLoading()
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
}
