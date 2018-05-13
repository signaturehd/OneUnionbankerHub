import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'

export default class SettingsPresenter {
  constructor (container) {
    this.getProfileInteractor = new GetProfileInteractor( container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

   getProfile () {
    this.view.showLoading()

    this.getProfileInteractor.execute()
     .do(profile => this.view.showProfile(profile.employee))
     .do(profile => this.view.showRank(profile.employee.rank))
     .do(profile => this.view.showLineManager(profile.employee.lineManager))
     .subscribe(profile => {
      this.view.hideLoading()
      this.view.showEmployeeProfile(profile.dependent)
     }, e => {
      this.view.hideLoading()
      // TODO prompt generic error
    })
   }
 }
