export default class ApprovalTrainingDetailsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getApprovalTrainingDetails(id, this.client.getToken())
  }
}
