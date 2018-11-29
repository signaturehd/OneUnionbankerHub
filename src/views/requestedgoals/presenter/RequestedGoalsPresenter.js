import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
import GetGoalTaskInteractor from '../../../domain/interactor/goals/GetGoalTaskInteractor'
import UpdateGoalsInteractor from '../../../domain/interactor/goals/UpdateGoalsInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import AddGoalTaskInteractor from '../../../domain/interactor/goals/AddGoalTaskInteractor'
import AddGoalCommentInteractor from '../../../domain/interactor/goals/AddGoalCommentInteractor'
import requestedGoalsParam from '../../../domain/param/AddRequestedGoalsParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class RequestCoachPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.getGoalTaskInteractor = new GetGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.updateGoalsInteractor = new UpdateGoalsInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.addGoalTaskInteractor = new AddGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.addGoalCommentInteractor = new AddGoalCommentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getGoals () {
    this.view.showCircularLoader()
    this.getRequestedGoalsInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.getRequestedGoals(data)
      }, error => {
        this.view.hideCircularLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  getGoalTask (goalId) {
    this.view.showTaskLoader()
    this.getGoalTaskInteractor.execute(goalId)
    .subscribe(data => {
      this.view.hideTaskLoader()
      this.view.getTasklist(data)
      }, error => {
        this.view.hideTaskLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  updateGoals (goalId, startDate, dueDate) {
    this.view.showSubmitLoader()
    this.updateGoalsInteractor.execute(goalId, startDate, dueDate)
    .subscribe(
      data => {
        this.view.hideSubmitLoader()
        this.getGoals()
        this.view.noticeResponse(data)
      },
      errors => {
        this.view.hideSubmitLoader()
      }
    )
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
        this.view.resetValue()
      },
      errors => {
        this.view.hideSubmitLoader()
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
        this.view.noticeResponse(data)
        this.getGoalTask(goalId)
        this.view.resetValue()
      },
      errors => {
        this.view.hideSubmitLoader()
      }
    )
  }

  addGoalComment (
    goalId,
    goalComment
  ){
    this.view.showSubmitLoader()
    this.addGoalCommentInteractor.execute(
      goalId,
      goalComment
    )
    .subscribe(
      data => {
        this.view.hideSubmitLoader()
        this.view.noticeResponse(data)
        this.view.resetValue()
      },
      errors => {
        this.view.hideSubmitLoader()
      }
    )
  }
}
