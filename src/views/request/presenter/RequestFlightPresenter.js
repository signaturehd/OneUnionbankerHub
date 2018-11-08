import GetAreaInteractor from '../../../domain/interactor/travel/GetAreaInteractor'
import GetTravelsInteractor from '../../../domain/interactor/travel/GetTravelsInteractor'
import AddRequestOneWayInteractor from '../../../domain/interactor/travel/AddRequestOneWayInteractor'
import AddRequestRoundTripInteractor from '../../../domain/interactor/travel/AddRequestRoundTripInteractor'
import requestOneWayParam from '../../../domain/param/AddRequestOneWayParam'
import requestRoundTripParam from '../../../domain/param/AddRequestRoundTripParam'

export default class RequestFlightPresenter {
  constructor (container) {
    this.getAreaInteractor = new GetAreaInteractor(container.get('HRBenefitsClient'))
    this.getTravelsInteractor = new GetTravelsInteractor(container.get('HRBenefitsClient'))
    this.addRequestOneWayInteractor = new AddRequestOneWayInteractor(container.get('HRBenefitsClient'))
    this.addRequestRoundTripInteractor = new AddRequestRoundTripInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getAreaData (pageNumber, findArea) {
    this.view.showCircularLoader()
    this.getAreaInteractor.execute(pageNumber, findArea)
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
    this.getTravelsInteractor.execute(0)
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.getTravels(travel)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }

  addRequestFlight (
    purposeId,
    departureOriginId,
    departureDestinationId,
    departureDate,
    departureTime,
    departureRemarks,
    returnOriginId,
    returnDestinationId,
    returnDate,
    returnTime,
    returnRemarks,
    typeOfFlight
  ) {
    this.view.showSubmitLoader()
    typeOfFlight === 'RoundTrip' ?
    this.addRequestRoundTripInteractor.execute(requestRoundTripParam(
      purposeId,
      departureOriginId,
      departureDestinationId,
      departureDate,
      departureTime,
      departureRemarks,
      returnOriginId,
      returnDestinationId,
      returnDate,
      returnTime,
      returnRemarks
    ))
      .subscribe(req => {
          this.view.hideSubmitLoader()
          this.view.noticeResponse(req)
          this.view.resetValue()
          this.getTravels()
        }, e => {
          this.view.hideSubmitLoader()
          // TODO prompt generic error
      })
    :
    this.addRequestOneWayInteractor.execute(requestOneWayParam(
      purposeId,
      departureOriginId,
      departureDestinationId,
      departureDate,
      departureTime,
      departureRemarks,
    ))
      .subscribe(req => {
          this.view.hideSubmitLoader()
          this.view.noticeResponse(req)
          this.view.resetValue()
          this.getTravels()
        }, e => {
          this.view.hideSubmitLoader()
          // TODO prompt generic error
      })
  }
}
