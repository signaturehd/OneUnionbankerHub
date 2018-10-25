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
    this.getTravelsInteractor.execute(4)
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
    isDomestic,
    attachmentsData
  ) {
    this.view.showCircularLoader()
    this.addBookFlightInteractor.execute(bookParam(
      requestId,
      totalCostOfFlight,
      totalServiceCharge,
      departureTime,
      returnTime,
      isDomestic,
      attachmentsData
    ))
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.noticeResponse()
          this.view.resetValue()
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }
}
