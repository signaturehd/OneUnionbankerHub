import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'

export default class SettingsPresenter {
  constructor (container) {
    this.GetProfileInteractor = new GetProfileInteractor( container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

   getProfile () {
    this.view.showLoading()

    this.GetProfileInteractor.execute()
     .subscribe(profile => {
      this.view.hideLoading()
      this.view.profile(profile)
     }, e => {
      this.view.hideLoading()
      // TODO prompt generic error
    })
   }
 }
