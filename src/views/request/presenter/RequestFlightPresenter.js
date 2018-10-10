import GetRequestFlightInteractor from '../../../domain/interactor/travel/getRequestFlightInteractor'

export default class RequestFlightPresenter {
  constructor (container) {
    this.getRequestFlightInteractor = new GetRequestFlightInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getRequestFlightData () {
    this.view.showCircularLoader()
    this.getRequestFlightInteractor.execute()
      .subscribe(request => {
          this.view.hideCircularLoader()
          this.view.getRequestFlightData(request)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }
}
