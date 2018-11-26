import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
export default class RequestCoachPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
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
}
