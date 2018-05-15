import LoginInteractor from '../../../domain/interactor/user/LoginInteractor'
import LoginParam from '../../../domain/param/LoginParam'

export default class LoginPresenter {
  constructor (container) {
    this.loginInteractor = new LoginInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  login (username, password) {
    this.view.showLoading()
    this.loginInteractor.execute(LoginParam(username, password))
      .subscribe(
        data => {
          this.view.hideLoading()
          this.view.onLoginSuccess()
        },
        error => {
          this.view.hideLoading()
          // TODO generic error handling
        }
      )
  }
}
