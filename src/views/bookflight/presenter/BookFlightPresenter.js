import GetTravelsInteractor from '../../../domain/interactor/travel/GetTravelsInteractor'
import AddBookFlightInteractor from '../../../domain/interactor/travel/AddBookFlightInteractor'
import bookParam from '../../../domain/param/AddBookFlightParam'

export default class BookFlightPresenter {
  constructor (container) {
    this.getTravelsInteractor = new GetTravelsInteractor(container.get('HRBenefitsClient'))
    this.addBookFlightInteractor = new AddBookFlightInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getTravels () {
    this.view.showCircularLoader()
    this.getTravelsInteractor.execute(6)
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.getTravels(travel)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }

  addBookFlight (
    requestId,
    totalCostOfFlight,
    totalServiceCharge,
    departureTime,
    returnTime,
    valueAddedTax,
    attachmentsData
  ) {
    this.view.showSubmitLoader()
    this.addBookFlightInteractor.execute(bookParam(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      valueAddedTax,
      attachmentsData
    ))
      .subscribe(travel => {
          this.view.hideSubmitLoader()
          this.view.noticeResponse(travel)
          this.view.resetValue()
        }, e => {
          this.view.hideSubmitLoader()
          // TODO prompt generic error
      })
  }
}
