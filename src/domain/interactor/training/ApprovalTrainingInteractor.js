export default class ApprovalTrainingInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getNeedApprovalTrainings(this.client.getToken())
  }
}
