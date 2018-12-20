import GetForApprovalGoalsInteractor from '../../../domain/interactor/goals/GetForApprovalGoalsInteractor'
import AddRequestedGoalsInteractor from '../../../domain/interactor/goals/AddRequestedGoalsInteractor'
import ApproveGoalsInteractor from '../../../domain/interactor/goals/ApproveGoalsInteractor'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class MyGoalsPresenter {
  constructor (container) {
    this.getForApprovalGoalsInteractor = new GetForApprovalGoalsInteractor(container.get('HRBenefitsClient'))
    this.addRequestedGoalsInteractor = new AddRequestedGoalsInteractor(container.get('HRBenefitsClient'))
    this.approveGoalsInteractor = new ApproveGoalsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getForApprovalGoals () {
    this.getForApprovalGoalsInteractor.execute()
    .subscribe(data => {
        this.view.getForApprovalGoals(data)
      }, error => {
        store.dispatch(NotifyActions.resetNotify())
    })
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
      }
    )
  }
}
