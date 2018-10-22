import GetAreaInteractor from '../../../domain/interactor/travel/GetAreaInteractor'
import GetTravelsInteractor from '../../../domain/interactor/travel/GetTravelsInteractor'

export default class RequestFlightPresenter {
  constructor (container) {
    this.getAreaInteractor = new GetAreaInteractor(container.get('HRBenefitsClient'))
    this.getTravelsInteractor = new GetTravelsInteractor(container.get('HRBenefitsClient'))
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

  getTravels () {
    this.view.showCircularLoader()
    this.getTravelsInteractor.execute()
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.getTravels(travel)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }
}
