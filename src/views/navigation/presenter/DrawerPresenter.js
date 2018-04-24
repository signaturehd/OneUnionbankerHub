import LogoutInteractor from '../../../domain/interactor/user/LogoutInteractor'

export default class DrawerPresenter {
  constructor (container) {
    this.logoutInteractor = new LogoutInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  logout () {
    this.logoutInteractor.execute()
    // TODO make reactive when logout API call is integrated
  }
}
