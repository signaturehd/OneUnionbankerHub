export default class AddApprovalInteractor {
  constructor (client) {
    this.client = client
  }

  execute (approvalParam) {
    return this.client.addApproval(this.client.getToken(), approvalParam)
  }
}
