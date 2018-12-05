import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
import GetGoalTaskInteractor from '../../../domain/interactor/goals/GetGoalTaskInteractor'
import GetGoalCommentInteractor from '../../../domain/interactor/goals/GetGoalCommentInteractor'
import UpdateGoalsInteractor from '../../../domain/interactor/goals/UpdateGoalsInteractor'
import UpdateGoalTaskInteractor from '../../../domain/interactor/goals/UpdateGoalTaskInteractor'
import UpdateGoalCommentInteractor from '../../../domain/interactor/goals/UpdateGoalCommentInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import AddGoalTaskInteractor from '../../../domain/interactor/goals/AddGoalTaskInteractor'
import AddGoalCommentInteractor from '../../../domain/interactor/goals/AddGoalCommentInteractor'
import DeleteGoalsInteractor from '../../../domain/interactor/goals/DeleteGoalsInteractor'
import requestedGoalsParam from '../../../domain/param/AddRequestedGoalsParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

let storedGoalId = '', storedPageNumber = '', storedPageItem = ''

export default class RequestCoachPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.getGoalTaskInteractor = new GetGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.getGoalCommentInteractor = new GetGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.updateGoalsInteractor = new UpdateGoalsInteractor(container.get('HRBenefitsClient'))
    this.updateGoalTaskInteractor = new UpdateGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.updateGoalCommentInteractor = new UpdateGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.addGoalTaskInteractor = new AddGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.addGoalCommentInteractor = new AddGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.deleteGoalsInteractor = new DeleteGoalsInteractor(container.get('HRBenefitsClient'))

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
    storedGoalId = goalId
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

  getGoalComment (goalId, pageNumber, pageItem) {
    storedPageNumber = pageNumber
    storedPageItem = pageItem
    this.view.showCommentLoader()
    this.getGoalCommentInteractor.execute(goalId, pageNumber, pageItem)
    .subscribe(data => {
      this.view.hideCommentLoader()
      this.view.getCommentList(data)
      }, error => {
        this.view.hideCommentLoader()
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

  updateGoalTask (
    goalId,
    taskDescription,
    isCompleted
  ){
    this.view.showSubmitLoader()
    try {
      this.updateGoalTaskInteractor.execute(
        goalId,
        taskDescription,
        isCompleted
      )
      .do(data => {
        this.getGoalTask(storedGoalId)
      })
      .do(data => {
        this.getGoalComment(storedGoalId, storedPageNumber, storedPageItem)
      })
      .subscribe  (
        data => {
          this.view.noticeResponse(data)
          this.view.hideSubmitLoader()
        },
        errors => {
          this.view.hideSubmitLoader()
        }
      )
    } catch (e) {
    }

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
    .do(data => {
      this.getGoalComment(storedGoalId, pageNumber, pageItem)
    })
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

  updateGoalComment (
    goalId,
    pageNumber,
    pageItem,
    commentId,
    goalComment
  ){
    this.view.showSubmitLoader()
    this.updateGoalCommentInteractor.execute(
      commentId,
      goalComment
    )
    .do(data => {
      this.getGoalComment(storedGoalId, pageNumber, pageItem)
    })
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

  deleteGoal (goalId) {
    this.view.showCircularLoader()
    try {
      this.deleteGoalsInteractor.execute(goalId)
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.getGoals()
          this.view.noticeResponse(data)
        },
        errors => {
          console.log(errors)
          this.view.hideCircularLoader()
        }
      )
    } catch (e) {
    }
  }
}
