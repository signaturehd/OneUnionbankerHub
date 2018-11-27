export default class ApproveGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (goalId, isApprove, rejectedRemarks) {
    return this.client.approveGoal(this.client.getToken(), goalId, isApprove, rejectedRemarks)
  }
}
