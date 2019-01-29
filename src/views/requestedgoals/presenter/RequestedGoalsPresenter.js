import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
import GetGoalTaskInteractor from '../../../domain/interactor/goals/GetGoalTaskInteractor'
import GetGoalCommentInteractor from '../../../domain/interactor/goals/GetGoalCommentInteractor'
import GetGoalHistoryInteractor from '../../../domain/interactor/goals/GetGoalHistoryInteractor'
import UpdateGoalsInteractor from '../../../domain/interactor/goals/UpdateGoalsInteractor'
import UpdateGoalTaskInteractor from '../../../domain/interactor/goals/UpdateGoalTaskInteractor'
import UpdateGoalCommentInteractor from '../../../domain/interactor/goals/UpdateGoalCommentInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import AddGoalTaskInteractor from '../../../domain/interactor/goals/AddGoalTaskInteractor'
import AddGoalCommentInteractor from '../../../domain/interactor/goals/AddGoalCommentInteractor'
import DeleteGoalsInteractor from '../../../domain/interactor/goals/DeleteGoalsInteractor'
import DeleteTaskInteractor from '../../../domain/interactor/goals/DeleteTaskInteractor'
import DeleteCommentInteractor from '../../../domain/interactor/goals/DeleteCommentInteractor'
import AddMarkAsCompletedWithTypeInteractor from '../../../domain/interactor/goals/AddMarkAsCompletedWithTypeInteractor'
import AddRatingGoalsInteractor from '../../../domain/interactor/goals/AddRatingGoalsInteractor'

import requestedGoalsParam from '../../../domain/param/AddRequestedGoalsParam'
import addRatingGoalsParam from '../../../domain/param/AddRatingGoalsParam'
import goalCommentParam from '../../../domain/param/AddGoalCommentParam'
import goalTaskParam from '../../../domain/param/AddGoalTaskParam'
import markParam from '../../../domain/param/AddMarkAsCompletedWithTypeParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'
let storedGoalId = '', storedPageNumber = '', storedPageItem = '', storedGoalType= ''

export default class RequestCoachPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.getGoalTaskInteractor = new GetGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.getGoalCommentInteractor = new GetGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.getGoalHistoryInteractor = new GetGoalHistoryInteractor(container.get('HRBenefitsClient'))
    this.updateGoalsInteractor = new UpdateGoalsInteractor(container.get('HRBenefitsClient'))
    this.updateGoalTaskInteractor = new UpdateGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.updateGoalCommentInteractor = new UpdateGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.addGoalTaskInteractor = new AddGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.addGoalCommentInteractor = new AddGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.deleteGoalsInteractor = new DeleteGoalsInteractor(container.get('HRBenefitsClient'))
    this.deleteTaskInteractor = new DeleteTaskInteractor(container.get('HRBenefitsClient'))
    this.deleteCommentInteractor = new DeleteCommentInteractor(container.get('HRBenefitsClient'))
    this.addMarkAsCompletedWithTypeInteractor = new AddMarkAsCompletedWithTypeInteractor(container.get('HRBenefitsClient'))
    this.addRatingGoalsInteractor = new AddRatingGoalsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getGoals (goalType) {
    this.view.showCircularLoader()
    this.getRequestedGoalsInteractor.execute(goalType)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.getRequestedGoals(data)
      }, error => {
        this.view.hideCircularLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  getGoalTask (goalId, goalType) {
    storedGoalId = goalId
    storedGoalType = goalType
    const objectParam = {
      goalId: goalId,
      goalType: goalType,
    }
    this.view.showTaskLoader()
    this.getGoalTaskInteractor.execute(objectParam)
      .subscribe(data => {
        this.view.hideTaskLoader()
        this.view.getTasklist(data)
        // this.view.checkIfShowMarkAsCompleted(this.view.checkIfGoalCompleted(data))
      }, error => {
        this.view.hideTaskLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  getGoalComment (goalId, goalType, pageNumber, pageItem) {
    storedPageNumber = pageNumber
    storedPageItem = pageItem
    storedGoalType = goalType
    const objectParam = {
      goalId: goalId,
      goalType : goalType,
    }
    this.getGoalCommentInteractor.execute(objectParam, pageNumber, pageItem)
    .subscribe(data => {
      this.view.getCommentList(data)
      }, error => {
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  updateGoals (goalId, startDate, dueDate) {
    this.view.showSubmitLoader()
    this.updateGoalsInteractor.execute(goalId, startDate, dueDate)
    .do(data => {
      this.getGoals()
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

  addRequestedGoals (
    goalTitle,
    description,
    startDate,
    dueDate,
    priorityId,
    goalTypeId,
    personal
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
      .subscribe (
        data => {
          this.getGoals(personal)
          this.view.hideSubmitLoader()
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
    this.addGoalTaskInteractor.execute(goalTaskParam(
        storedGoalType,
        goalId,
        taskDescription
      )
    )
    .do(data => {
      this.getGoalTask(storedGoalId, storedGoalType)
    })
    .subscribe(
      data => {
        this.view.hideSubmitLoader()
      },
      errors => {
        this.view.hideSubmitLoader()
      }
    )
  }

  updateGoalTask (
    taskId,
    taskDescription,
    isCompleted
  ){
    try {
      const objectParam = {
        taskId: taskId,
        goalType: storedGoalType,
      }
      this.updateGoalTaskInteractor.execute(
        objectParam,
        taskDescription,
        isCompleted
      )
      .do(data => {
        this.getGoalTask(storedGoalId, storedGoalType)
      })
      .subscribe  (
        data => {
        },
        errors => {
        }
      )
    } catch (e) {
    }

  }

  addGoalComment (
    personal,
    goalId,
    goalComment,
    pageNumber,
    pageItem
  ){
    this.view.showCommentLoader(true)
    this.addGoalCommentInteractor.execute(goalCommentParam(
        personal,
        goalId,
        goalComment
      )
    )
    .do(data => {
      this.getGoalComment(storedGoalId, pageNumber, pageItem)
    })
    .subscribe(
      data => {
        this.view.showCommentLoader(false)
      },
      errors => {
        this.view.showCommentLoader(false)
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
      .do(data => {
        this.getGoals(storedGoalType)
      })
      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeResponse(data)
        },
        errors => {
          this.view.hideCircularLoader()
        }
      )
    } catch (e) {
    }
  }

  deleteTask (taskId, goalId) {
    this.view.showSubmitLoader()
    try {
      this.deleteTaskInteractor.execute(taskId)
      .do(data => {
        this.getGoalTask(goalId)
      })
      .subscribe(
        data => {
          this.view.hideSubmitLoader()
        },
        errors => {
          this.view.hideSubmitLoader()
        }
      )
    } catch (e) {
    }
  }

  deleteComment (commentId, goalId, pageNumber, pageItem) {
    this.view.showSubmitLoader()
    try {
      this.deleteCommentInteractor.execute(commentId)
      .do(data => {
        this.getGoalComment(storedGoalId, storedPageNumber, storedPageItem)
      })
      .subscribe(
        data => {
          this.view.hideSubmitLoader()
        },
        errors => {
          this.view.hideSubmitLoader()
        }
      )
    } catch (e) {
      console.log(e);
    }
  }

  getGoalsHistory (goalId, pageNumber, pageItem) {
    storedPageNumber = pageNumber
    storedPageItem = pageItem
    this.getGoalHistoryInteractor.execute(goalId, pageNumber, pageItem)
    .subscribe(data => {
      this.view.getHistoryList(data)
      }, error => {
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  markAsCompletedWithType (
    businessOutcome
  ){
    this.view.showSubmitLoader()
    this.addMarkAsCompletedWithTypeInteractor.execute(
      markParam(
        storedGoalType,
        storedGoalId,
        businessOutcome,
      )
    )
    .subscribe(
      data => {
        this.view.noticeResponse(data)
        this.view.hideSubmitLoader()
        this.getGoals(storedGoalType)
        this.view.resetValue()
      },
      errors => {
        this.view.hideSubmitLoader()
      }
    )
  }

  addRatingGoal (id, ratings, remarks) {
    this.view.showSubmitLoader()
    this.addRatingGoalsInteractor.execute(addRatingGoalsParam(id, ratings, remarks))
    .subscribe(data => {
      this.view.noticeResponse(data)
      this.view.resetRemarks()
      this.getGoals(storedGoalType)
      this.view.hideSubmitLoader()
    }, error => {
      this.view.hideSubmitLoader()
    })
  }
}
