import GetTravelsInteractor from '../../../domain/interactor/travel/GetTravelsInteractor'

export default class LiquidationPresenter {
  constructor (container) {
    this.getTravelsInteractor = new GetTravelsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
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
