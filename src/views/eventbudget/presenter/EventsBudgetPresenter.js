import ValidateEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/ValidateEventsBudgetInteractor'
import AddEventsBudgetInteractor from '../../../domain/interactor/eventsbudget/AddEventsBudgetInteractor'

import AddEventsBudgetParam from '../../../domain/param/AddEventsBudgetParam'

export default class EventsBudgetPresenter {
  constructor (container) {
    this.validateEventsBudgetInteractor = new ValidateEventsBudgetInteractor(container.get('HRBenefitsClient'))
    this.addEventsBudgetInteractor = new AddEventsBudgetInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
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
