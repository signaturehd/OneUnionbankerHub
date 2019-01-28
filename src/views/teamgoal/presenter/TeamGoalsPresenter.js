import AddMarkAsCompletedWithTypeInteractor from '../../../domain/interactor/goals/AddMarkAsCompletedWithTypeInteractor'
import GetSquadGoalsCommentInteractor from '../../../domain/interactor/goals/GetSquadGoalsCommentInteractor'
import AddSquadGoalCommentInteractor from '../../../domain/interactor/goals/AddSquadGoalCommentInteractor'
import GetTeamGoalsInteractor from '../../../domain/interactor/goals/GetTeamGoalsInteractor'
import GetSquadGoalsInteractor from '../../../domain/interactor/goals/GetSquadGoalsInteractor'
import GetGoalTaskInteractor from '../../../domain/interactor/goals/GetGoalTaskInteractor'
import GetGoalCommentInteractor from '../../../domain/interactor/goals/GetGoalCommentInteractor'
import GetGoalHistoryInteractor from '../../../domain/interactor/goals/GetGoalHistoryInteractor'
import GetMembersInteractor from '../../../domain/interactor/goals/GetMembersInteractor'
import GetDirectReportGoalsInteractor from '../../../domain/interactor/goals/GetDirectReportGoalsInteractor'
import UpdateGoalsInteractor from '../../../domain/interactor/goals/UpdateGoalsInteractor'
import UpdateGoalTaskInteractor from '../../../domain/interactor/goals/UpdateGoalTaskInteractor'
import UpdateGoalCommentInteractor from '../../../domain/interactor/goals/UpdateGoalCommentInteractor'
import AddTeamGoalsInteractor from '../../../domain/interactor/goals/AddTeamGoalsInteractor'
import AddSquadGoalsInteractor from '../../../domain/interactor/goals/AddSquadGoalsInteractor'
import AddGoalTaskInteractor from '../../../domain/interactor/goals/AddGoalTaskInteractor'
import AddGoalCommentInteractor from '../../../domain/interactor/goals/AddGoalCommentInteractor'
import DeleteGoalsInteractor from '../../../domain/interactor/goals/DeleteGoalsInteractor'
import DeleteTaskInteractor from '../../../domain/interactor/goals/DeleteTaskInteractor'
import DeleteCommentInteractor from '../../../domain/interactor/goals/DeleteCommentInteractor'
import teamGoalsParam from '../../../domain/param/AddTeamGoalsParam'
import squadGoalsParam from '../../../domain/param/AddSquadGoalsParam'
import addMarkAsCompletedWithTypeParam from '../../../domain/param/AddMarkAsCompletedWithTypeParam'
import addSquadGoalCommentParam from '../../../domain/param/AddSquadGoalCommentParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

let storedGoalId = '', storedPageNumber = '', storedPageItem = ''

export default class RequestCoachPresenter {
  constructor (container) {
    this.addMarkAsCompletedWithTypeInteractor = new AddMarkAsCompletedWithTypeInteractor(container.get('HRBenefitsClient'))
    this.getSquadGoalsCommentInteractor = new GetSquadGoalsCommentInteractor(container.get('HRBenefitsClient'))
    this.addSquadGoalCommentInteractor = new AddSquadGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.getTeamGoalsInteractor = new GetTeamGoalsInteractor(container.get('HRBenefitsClient'))
    this.getSquadGoalsInteractor = new GetSquadGoalsInteractor(container.get('HRBenefitsClient'))
    this.getGoalTaskInteractor = new GetGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.getGoalCommentInteractor = new GetGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.getGoalHistoryInteractor = new GetGoalHistoryInteractor(container.get('HRBenefitsClient'))
    this.getMembersInteractor = new GetMembersInteractor(container.get('HRBenefitsClient'))
    this.getDirectReportGoalsInteractor = new GetDirectReportGoalsInteractor(container.get('HRBenefitsClient'))
    this.updateGoalsInteractor = new UpdateGoalsInteractor(container.get('HRBenefitsClient'))
    this.updateGoalTaskInteractor = new UpdateGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.updateGoalCommentInteractor = new UpdateGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.addTeamGoalsInteractor = new AddTeamGoalsInteractor(container.get('HRBenefitsClient'))
    this.addSquadGoalsInteractor = new AddSquadGoalsInteractor(container.get('HRBenefitsClient'))
    this.addGoalTaskInteractor = new AddGoalTaskInteractor(container.get('HRBenefitsClient'))
    this.addGoalCommentInteractor = new AddGoalCommentInteractor(container.get('HRBenefitsClient'))
    this.deleteGoalsInteractor = new DeleteGoalsInteractor(container.get('HRBenefitsClient'))
    this.deleteTaskInteractor = new DeleteTaskInteractor(container.get('HRBenefitsClient'))
    this.deleteCommentInteractor = new DeleteCommentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getSquadGoalComment (pageNumber, pageItem, goalId, goalType) {
    try {
      this.view.showCircularLoader()
      this.getSquadGoalsCommentInteractor.execute(pageNumber, pageItem, goalId, goalType)
      .subscribe(data => {
        this.view.hideCircularLoader()
        this.view.setSquadGoalCommentList(data)
      }, error => {
        this.view.hideCircularLoader()
      })
    } catch(e) {
       console.log(e)
    }
  }

  addSquadGoalComment (type, id, description) {
    this.view.showCircularLoader()
    this.addSquadGoalCommentInteractor.execute(addSquadGoalCommentParam(type, id, description))
    .subscribe(data => {
      this.view.noticeResponse(data)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  markAsCompletedWithType (type, id, remarks) {
    this.view.showCircularLoader()
    this.addMarkAsCompletedWithTypeInteractor.execute(addMarkAsCompletedWithTypeParam(type, id, remarks))
    .subscribe(data=> {
      this.view.hideCircularLoader()
    },error => {
      this.view.hideCircularLoader()
    })
  }

  getTeamGoals (goalType) {
    this.view.showCircularLoader()
    this.getTeamGoalsInteractor.execute(goalType)
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
    goalType,
    participantArray,
    goalTitle,
    description,
    startDate,
    dueDate,
    priorityId,
    goalTypeId
  ){
    this.view.showSubmitLoader()
      this.addTeamGoalsInteractor.execute(teamGoalsParam(
          goalType,
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
        this.getTeamGoals(goalType)
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

  addSquadGoals (
    goalType,
    participantArray,
    goalTitle,
    description,
    startDate,
    dueDate,
    priorityId,
    goalTypeId,
    squadId
  ){
    this.view.showSubmitLoader()
      this.addSquadGoalsInteractor.execute(squadGoalsParam(
          goalType,
          participantArray,
          goalTitle,
          description,
          startDate,
          dueDate,
          priorityId,
          goalTypeId,
          squadId
        )
      )
      .do(data => {
        this.getSquadGoals(goalType)
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

  getMembersGoals(goalType) {
    this.view.showTaskLoader()
    this.getMembersInteractor.execute(goalType)
      .subscribe(data => {
        this.view.hideTaskLoader()
        this.view.getMembersList(data)
      }, error => {
        this.view.hideTaskLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  getDirectReportGoals () {
    this.view.showCircularLoader()
    this.getDirectReportGoalsInteractor.execute()
      .subscribe(data => {
        this.view.hideCircularLoader()
        this.view.getDirectReportGoals(data)
      }, error => {
        this.view.hideCircularLoader()
        store.dispatch(NotifyActions.resetNotify())
    })
  }
}
