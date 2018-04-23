import CheckLoginInteractor from '../domain/interactor/session/CheckLoginInteractor'

export default class AppPresenter {
  constructor (container) {
    this.checkLoginInteractor = new CheckLoginInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  checkLogin () {
    // IF TODO need to be async, as of now this is sync
    this.view.isLogin(this.checkLoginInteractor.execute())
  }
}
