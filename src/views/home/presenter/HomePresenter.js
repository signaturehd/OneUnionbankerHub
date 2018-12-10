import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'

export default class HomePresenter {
  constructor(container) {
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getProfile () {
    this.getProfileInteractor.execute()
     .do(profile => this.view.showProfileName(profile.employee.fullname))
     .subscribe()
  }
}
