import ValidateEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/ValidateEventsBudgetInteractor'
import AddEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/AddEventsBudgetInteractor'

import addEventsBudgetParam from '../../../domain/param/AddEventsBudgetParam'

import moment from 'moment'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

let storedCelebrationText = '',
    storedVenueText= '',
    storedAddressText = '',
    storedRegionText = '',
    storedCityText = '',
    storedFile ,
    storedProvinceText = '' ,
    storedRequestId = '',
    storedBenefitId = '42',
    storedDate = '',
    storedAmount = 0,
    storedId = [],
    storedAmountPerEmployee = 0

export default class EventsBudgetPresenter {
  constructor (container) {
    this.validateEventsBudgetInteractor = new ValidateEventsBudgetInteractor(container.get('HRBenefitsClient'))
    this.addEventsBudgetInteractor = new AddEventsBudgetInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setVenue (venueText) {
    storedVenueText = venueText
    this.view.setVenue(venueText)
  }

  setCelebration (celebrationText) {
    storedCelebrationText = celebrationText
    this.view.setCelebration(celebrationText)
  }

  setAddress (addressText) {
    storedAddressText = addressText
    this.view.setAddress(storedAddressText)
  }

  setRegion (regionText) {
    storedRegionText = regionText
    this.view.setRegion(storedRegionText)
  }

  setProvince (provinceText) {
    storedProvinceText = provinceText
    this.view.setProvince(storedProvinceText)
  }

  setCity (cityText) {
    storedCityText = cityText
    this.view.setCity(storedCityText)
  }

  setAmount (amountText) {
    storedAmount = amountText
    this.view.setAmount(storedAmount)
  }

  setRequestId (requestId) {
    storedRequestId = requestId
    this.view.setRequestId(storedRequestId)
  }

  setDateFunc (preferredDate) {
    storedDate = preferredDate
    this.view.setDateFunc(storedDate)
  }

  setAttendees (updatedAttendees) {
    storedId = updatedAttendees
    this.view.showAttendees(storedId)
    this.view.showAmount(storedId.length * storedAmountPerEmployee)
  }

  validateEventsBudget () {
    store.dispatch(NotifyActions.resetNotify())
    this.view.showCircularLoader()
    this.validateEventsBudgetInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      data.attendees.map((resp) =>{
        resp.employees.map((empResp) => {
          const hasRecord = [...storedId]
          if(empResp.hasRecord === true) {
            hasRecord.push(empResp.id)
            storedId = hasRecord
          }
        })
      })
      this.setAttendees(storedId)
      this.view.showEventBudget(data, storedBenefitId)
      storedAmountPerEmployee = data.events.amount
    }, error => {
      this.view.navigate()
      this.view.hideCircularLoader()
    })
  }

  addEventsBudget (storedListId) {
    const newArrayId = storedListId
    const uniArr = [...(new Set(newArrayId))]
    if(storedVenueText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Venue field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedAddressText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Address field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedRegionText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Region field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedProvinceText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'Province field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedCityText === '') {
      store.dispatch(NotifyActions.resetNotify())
      store.dispatch(NotifyActions.addNotify({
          title: 'Events Budget',
          message : 'City field is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else {
      this.view.showCircularLoader()
      this.addEventsBudgetInteractor.execute(
        addEventsBudgetParam(
          storedRequestId,
          storedVenueText,
          storedAddressText,
          storedRegionText,
          storedProvinceText,
          storedCityText,
          moment(storedDate).format('YYYY-MM-DD'),
          uniArr,
        )
      )
      .subscribe(data => {
        this.view.hideCircularLoader()
        this.view.noticeOfUndertaking(true)
        this.view.noticeOfUndertakingForm(data)
      }, error => {
        this.view.hideCircularLoader()
      })
    }
  }
}
