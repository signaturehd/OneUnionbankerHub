export default class EnrolledTrainingInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEnrolledTrainings(this.client.getToken())
  }
}
