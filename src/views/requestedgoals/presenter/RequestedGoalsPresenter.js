import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import requestedGoalsParam from '../../../domain/param/AddRequestedGoalsParam'

export default class RequestCoachPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getGoals () {
    this.getRequestedGoalsInteractor.execute()
    .subscribe(data => {
      this.view.getRequestedGoals(data)
      }, error => {
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  addRequestedGoals (
    goalTitle,
    description,
    startDate,
    dueDate,
    priorityId,
    goalTypeId
  ) {
      this.view.showCircularLoader()
      this.addRequestedGoalsInteractor.execute(requestedGoalsParam(
          goalTitle,
          description,
          startDate,
          dueDate,
          priorityId,
          goalTypeId
        )
      )
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.getGoals()
          this.view.noticeResponse(data)
        },
        errors => {
          this.view.hideCircularLoader()
          this.view.noticeResponse(errors.message)
        }
      )
    }
}
