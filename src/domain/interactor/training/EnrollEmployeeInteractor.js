export default class EnrollEmployeeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.enrollEmployee(this.client.getToken(), id)
  }
}
