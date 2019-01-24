export default class ApproveGoalsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (approvalGoalsParam) {
    return this.client.approveGoal(this.client.getToken(), approvalGoalsParam)
  }
}
