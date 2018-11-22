import GetRequestedGoalsInteractor from '../../../domain/interactor/goals/GetRequestedGoalsInteractor'
import GetForApprovalGoalsInteractor from '../../../domain/interactor/goals/GetForApprovalGoalsInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import UpdateGoalsInteractor from '../../../domain/interactor/goals/UpdateGoalsInteractor'
import ApproveGoalsInteractor from '../../../domain/interactor/goals/ApproveGoalsInteractor'
import requestedGoalsParam from '../../../domain/param/AddRequestedGoalsParam'
import store from '../../../store'

export default class MyGoalsPresenter {
  constructor (container) {
    this.getRequestedGoalsInteractor = new GetRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.getForApprovalGoalsInteractor = new GetForApprovalGoalsInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.updateGoalsInteractor = new UpdateGoalsInteractor(container.get('HRBenefitsClient'))
    this.approveGoalsInteractor = new ApproveGoalsInteractor(container.get('HRBenefitsClient'))
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

  getForApprovalGoals () {
    this.getForApprovalGoalsInteractor.execute()
    .subscribe(data => {
      this.view.getForApprovalGoals(data)
      }, error => {
        store.dispatch(NotifyActions.resetNotify())
    })
  }

  updateGoals (goalId, dueDate) {
    this.view.showCircularLoader()
    this.updateGoalsInteractor.execute(goalId, dueDate)
    .subscribe(
      data => {
        this.view.hideCircularLoader()
        this.getGoals()
        this.view.noticeResponse(data)
      },
      errors => {
        this.view.hideCircularLoader()
        this.view.noticeResponse(errors)
      }
    )
  }

  approveGoal (goalId, isApprove, rejectedRemarks) {
    this.view.showCircularLoader()
    this.approveGoalsInteractor.execute(goalId, isApprove, rejectedRemarks)
    .subscribe(
      data => {
        this.view.hideCircularLoader()
        this.getForApprovalGoals()
        this.view.noticeResponse(data)
      },
      errors => {
        this.view.hideCircularLoader()
        this.view.noticeResponse(errors)
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
