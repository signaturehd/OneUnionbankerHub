import LogoutInteractor from '../../../domain/interactor/user/LogoutInteractor'
import GetLibrariesInteractor from '../../../domain/interactor/user/GetLibrariesInteractor'
import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'

export default class NavigationPresenter {
  constructor (container) {
    this.logoutInteractor = new LogoutInteractor(container.get('HRBenefitsClient'))
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.getLibrariesInteractor = new GetLibrariesInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  logout () {
    this.logoutInteractor.execute()
    // TODO make reactive when logout API call is integrated
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
     // TODO prompt generic error
   })
  }
}
