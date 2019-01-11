import GetTeamGoalsInteractor from '../../../domain/interactor/goals/GetTeamGoalsInteractor'
import GetSquadGoalsInteractor from '../../../domain/interactor/goals/GetSquadGoalsInteractor'
import GetGoalTaskInteractor from '../../../domain/interactor/goals/GetGoalTaskInteractor'
import GetGoalCommentInteractor from '../../../domain/interactor/goals/GetGoalCommentInteractor'
import GetGoalHistoryInteractor from '../../../domain/interactor/goals/GetGoalHistoryInteractor'
import UpdateGoalsInteractor from '../../../domain/interactor/goals/UpdateGoalsInteractor'
import UpdateGoalTaskInteractor from '../../../domain/interactor/goals/UpdateGoalTaskInteractor'
import UpdateGoalCommentInteractor from '../../../domain/interactor/goals/UpdateGoalCommentInteractor'
import AddTeamGoalsInteractor from '../../../domain/interactor/goals/AddTeamGoalsInteractor'
import AddGoalTaskInteractor from '../../../domain/interactor/goals/AddGoalTaskInteractor'
import AddGoalCommentInteractor from '../../../domain/interactor/goals/AddGoalCommentInteractor'
import DeleteGoalsInteractor from '../../../domain/interactor/goals/DeleteGoalsInteractor'
import DeleteTaskInteractor from '../../../domain/interactor/goals/DeleteTaskInteractor'
import DeleteCommentInteractor from '../../../domain/interactor/goals/DeleteCommentInteractor'
import teamGoalsParam from '../../../domain/param/AddTeamGoalsParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

let storedGoalId = '', storedPageNumber = '', storedPageItem = ''

export default class RequestCoachPresenter {
  constructor (container) {
    this.getTeamGoalsInteractor = new GetTeamGoalsInteractor(container.get('HRBenefitsClient'))
    this.getSquadGoalsInteractor = new GetSquadGoalsInteractor(container.get('HRBenefitsClient'))
    this.getGoalTaskInteractor = new GetGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.getGoalCommentInteractor = new GetGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.getGoalHistoryInteractor = new GetGoalHistoryInteractor(container.get('HRBenefitsClient'))
    this.updateGoalsInteractor = new UpdateGoalsInteractor(container.get('HRBenefitsClient'))
    this.updateGoalTaskInteractor = new UpdateGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.updateGoalCommentInteractor = new UpdateGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.addTeamGoalsInteractor = new AddTeamGoalsInteractor(container.get('HRBenefitsClient'))
    this.addGoalTaskInteractor = new AddGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.addGoalCommentInteractor = new AddGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.deleteGoalsInteractor = new DeleteGoalsInteractor(container.get('HRBenefitsClient'))
    this.deleteTaskInteractor = new DeleteTaskInteractor(container.get('HRBenefitsClient'))
    this.deleteCommentInteractor = new DeleteCommentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getTeamGoals (status, goalType) {
    this.view.showCircularLoader()
    this.getTeamGoalsInteractor.execute(status, goalType)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.getTeamGoals(data)
      }, error => {
        this.view.hideCircularLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  getSquadGoals (goalType) {
    this.view.showCircularLoader()
    this.getSquadGoalsInteractor.execute(goalType)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.getSquadGoals(data)
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
    this.getGoalCommentInteractor.execute(goalId, pageNumber, pageItem)
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

  addTeamGoals (
    participantArray,
    goalTitle,
    description,
    startDate,
    dueDate,
    priorityId,
    goalTypeId
  ){
    this.view.showSubmitLoader()
    if (new  Date(dueDate).getYear() !== new Date(startDAte).getYear()) {
      this.view.hideSubmitLoader()
      store.dispatch(NotifyActions.addNotify({
          title : 'Goals and Performance',
          message : 'Year for Due Date field must be the same as the Start Date',
          type : 'success',
          duration : 3000
        })
      )
    } else {
      this.addTeamGoalsInteractor.execute(teamGoalsParam(
          participantArray,
          goalTitle,
          description,
          startDate,
          dueDate,
          priorityId,
          goalTypeId
        )
      )
      .do(data => {
        this.getTeamGoals()
      })
      .subscribe (
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

  addGoalTask (
    goalId,
    taskDescription
  ){
    this.view.showSubmitLoader()
    this.addGoalTaskInteractor.execute(
      goalId,
      taskDescription
    )
    .do(data => {
      this.getGoalTask(storedGoalId)
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
    this.view.showSubmitLoader()
    try {
      this.updateGoalTaskInteractor.execute(
        taskId,
        taskDescription,
        isCompleted
      )
      .do(data => {
        this.getGoalTask(storedGoalId)
      })
      .subscribe  (
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

  addGoalComment (
    goalId,
    goalComment,
    pageNumber,
    pageItem
  ){
    this.view.checkCommentLoader(true)
    this.addGoalCommentInteractor.execute(
      goalId,
      goalComment
    )
    .do(data => {
      this.getGoalComment(storedGoalId, pageNumber, pageItem)
    })
    .subscribe(
      data => {
        this.view.checkCommentLoader(false)
      },
      errors => {
        this.view.checkCommentLoader(false)
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
        this.getGoals()
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
}
