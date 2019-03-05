import GetTravelsInteractor from '../../../domain/interactor/travel/GetTravelsInteractor'
import GetTravelGroupInteractor from '../../../domain/interactor/travel/GetTravelGroupInteractor'
import AddBookFlightInteractor from '../../../domain/interactor/travel/AddBookFlightInteractor'
import bookParam from '../../../domain/param/AddBookFlightParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class BookFlightPresenter {
  constructor (container) {
    this.getTravelsInteractor = new GetTravelsInteractor(container.get('HRBenefitsClient'))
    this.getTravelGroupInteractor = new GetTravelGroupInteractor(container.get('HRBenefitsClient'))
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

  getTravelGroup () {
    this.view.showCircularLoader()
    this.getTravelGroupInteractor.execute()
      .subscribe(group => {
          this.view.hideCircularLoader()
          this.view.getTravelGroup(group)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }

  validateSubmission (
    isDomestic,
    requestId,
    totalCostOfFlight,
    totalServiceCharge,
    departureTime,
    returnTime,
    valueAddedTax,
    travelGroupId,
    attachmentsData,
    attachmentsData2
  ) {
    try {
      if(isDomestic) {
        if (returnTime === '0') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Book Flight',
            message: 'Return Time is required',
            type: 'warning',
            duration: 5000
            })
          )
        } else if (totalCostOfFlight === '0') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Book Flight',
            message: 'Total Cost of Flight is required',
            type: 'warning',
            duration: 5000
            })
          )
        } else if (totalServiceCharge === '0') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Book Flight',
            message: 'Total Service Charge is required',
            type: 'warning',
            duration: 5000
            })
          )
        } else if (!attachmentsData.length) {
           store.dispatch(NotifyActions.addNotify({
              title : 'My Benefits' ,
              message : 'Attachments is required',
              type : 'warning',
              duration : 2000
            })
          )
        } else if (validateAttachments) {
          attachmentsData && attachmentsData.map(
            (attachment, key) => {
              if(!attachment.file) {
                store.dispatch(NotifyActions.addNotify({
                   title : 'My Benefits',
                   message : attachment.name + ' is required',
                   type : 'warning',
                   duration : 2000
                 })
               )
              }
            }
          )
        } else {
          this.view.setEditable(true)
        }
      } else {
        let validateAttachments = false
        attachmentsData2 && attachmentsData2.map(
          (attachment, key) => {
            if(!attachment.file) {
              validateAttachments = true
            }
          }
        )

        if (returnTime === '0') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Book Flight',
            message: 'Return Time is required',
            type: 'warning',
            duration: 5000
            })
          )
        } else if (totalCostOfFlight === '0') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Book Flight',
            message: 'Total Cost of Flight is required',
            type: 'warning',
            duration: 5000
            })
          )
        } else if (totalServiceCharge === '0') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Book Flight',
            message: 'Total Service Charge is required',
            type: 'warning',
            duration: 5000
            })
          )
        } else if (validateAttachments) {
          attachmentsData2 && attachmentsData2.map(
            (attachment, key) => {
              if(!attachment.file) {
                store.dispatch(NotifyActions.addNotify({
                   title : 'My Benefits',
                   message : attachment.name + ' is required',
                   type : 'warning',
                   duration : 2000
                 })
               )
              }
            }
          )
        } else {
          this.view.setEditable(true)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  addBookFlight (
    requestId,
    totalCostOfFlight,
    totalServiceCharge,
    departureTime,
    returnTime,
    valueAddedTax,
    travelGroupId,
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
      travelGroupId,
      attachmentsData
    ))
      .subscribe(travel => {
          this.view.hideSubmitLoader()
          this.view.noticeResponse(travel)
          this.view.resetValue()
          this.getTravels()
        }, e => {
          this.view.hideSubmitLoader()
          // TODO prompt generic error
      })
  }
}
