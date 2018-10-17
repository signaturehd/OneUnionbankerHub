import ValidateEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/ValidateEventsBudgetInteractor'
import AddEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/AddEventsBudgetInteractor'

import AddEventsBudgetParam from '../../../domain/param/AddEventsBudgetParam'

let storedCelebrationText = '', storedVenueText= '', storedAddressText = '', storedRegionText = '', storedFile

export default class EventsBudgetPresenter {
  constructor (container) {
    this.validateEventsBudgetInteractor = new ValidateEventsBudgetInteractor(container.get('HRBenefitsClient'))
    this.addEventsBudgetInteractor = new AddEventsBudgetInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setVenue (venueText) {
    storedVenue = venueText
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

  setAmount (amountText) {
    storedAmount = amountText
    this.view.setAmount(amountText)
  }

  validateEventsBudget () {
    this.validateEventsBudgetInteractor.execute()
    .subscribe(data => {
      this.view.showEventBudget(data)
    }, error => {
    })
  }

  addEventsBudget (
    requestId,
    venueName,
    address,
    region,
    province,
    city,
    attendees,
  ) {
    this.addEventsBudgetInteractor.execute(
      AddEventsBudgetParam(
        requestId,
        venueName,
        address,
        region,
        province,
        city,
        attendees,
      )
    )
    .subscribe(data => {
    }, error => {
    })
  }
}
