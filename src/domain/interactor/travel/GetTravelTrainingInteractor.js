export default class GetTravelTrainingInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getTravelTraining(this.client.getToken())
  }
}
