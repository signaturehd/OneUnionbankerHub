import ValidateEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/ValidateEventsBudgetInteractor'
import AddEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/AddEventsBudgetInteractor'

import addEventsBudgetParam from '../../../domain/param/AddEventsBudgetParam'

let storedCelebrationText = '',
    storedVenueText= '',
    storedAddressText = '',
    storedRegionText = '',
    storedCityText = '',
    storedFile ,
    storedProvinceText = '' ,
    storedRequestId = '',
    storedBenefitId = '42'

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
    this.view.setAddress(addressText)
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
    this.view.setAmount(amountText)
  }

  setRequestId (requestId) {
    storedRequestId = requestId
    this.view.setRequestId(storedRequestId)
  }

  validateEventsBudget () {
    this.view.showCircularLoader()
    this.validateEventsBudgetInteractor.execute()
    .subscribe(data => {
      this.view.showEventBudget(data, storedBenefitId)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  addEventsBudget (attendees) {
    this.view.showCircularLoader()
    this.addEventsBudgetInteractor.execute(
      addEventsBudgetParam(
        storedRequestId,
        storedVenueText,
        storedAddressText,
        storedRegionText,
        storedProvinceText,
        storedCityText,
        attendees,
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
