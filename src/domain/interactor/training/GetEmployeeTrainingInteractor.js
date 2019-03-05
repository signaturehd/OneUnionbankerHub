export default class GetEmployeeTrainingInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEmployeeTraining(this.client.getToken())
  }
}
