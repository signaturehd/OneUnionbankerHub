export default class ApprovalTrainingRequestInteractor {
  constructor (client) {
    this.client = client
  }

  execute (trainingId, ApprovalTrainingParam) {
    return this.client.trainingRequest(trainingId, ApprovalTrainingParam, this.client.getToken())
  }
}
