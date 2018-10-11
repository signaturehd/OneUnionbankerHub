import GetAreaInteractor from '../../../domain/interactor/travel/getAreaInteractor'

export default class RequestFlightPresenter {
  constructor (container) {
    this.getAreaInteractor = new GetAreaInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getAreaData () {
    this.view.showCircularLoader()
    this.getAreaInteractor.execute()
      .subscribe(area => {
          this.view.hideCircularLoader()
          this.view.getAreaData(area)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }
}
