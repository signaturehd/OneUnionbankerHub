export default class GetEmployeeTrainingDetailsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getEmployeeTrainingDetails(this.client.getToken(), id)
  }
}
