export default class ApprovedTrainingInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getApprovedTrainings(this.client.getToken())
  }
}
