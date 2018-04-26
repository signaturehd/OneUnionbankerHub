import LogoutInteractor from '../../../domain/interactor/user/LogoutInteractor'
import GetLibrariesInteractor from '../../../domain/interactor/user/GetLibrariesInteractor'

export default class NavigationPresenter {
  constructor (container) {
    this.logoutInteractor = new LogoutInteractor(container.get('HRBenefitsClient'))
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
    this.getLibrariesInteractor.execute()
  }
}
