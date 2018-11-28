import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
import GetGoalTaskInteractor from '../../../domain/interactor/goals/GetGoalTaskInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import AddGoalTaskInteractor from '../../../domain/interactor/goals/AddGoalTaskInteractor'
import requestedGoalsParam from '../../../domain/param/AddRequestedGoalsParam'

export default class RequestCoachPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.getGoalTaskInteractor = new GetGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.addGoalTaskInteractor = new AddGoalTaskInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getGoals () {
    this.view.showCircularLoader()
    this.getRequestedGoalsInteractor.execute()
    .subscribe(data => {
      this.view.getRequestedGoals(data)
      }, error => {
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  getGoalTask (goalId) {
    this.getGoalTaskInteractor.execute(goalId)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.getGoalTask(data)
      }, error => {
        this.view.hideCircularLoader()
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
  ){
    this.view.showSubmitLoader()
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
        this.view.hideSubmitLoader()
        this.getGoals()
        this.view.noticeResponse(data)
      },
      errors => {
        this.view.hideSubmitLoader()
        this.view.noticeResponse(errors.message)
      }
    )
  }

  addGoalTask (
    goalId,
    taskDescription
  ){
    this.view.showSubmitLoader()
    this.addGoalTaskInteractor.execute(
      goalId,
      taskDescription
    )
    .subscribe(
      data => {
        this.view.hideSubmitLoader()
        this.getGoalTask(goalId)
        this.view.noticeResponse(data)
      },
      errors => {
        this.view.hideSubmitLoader()
        this.view.noticeResponse(errors.message)
      }
    )
  }
}
