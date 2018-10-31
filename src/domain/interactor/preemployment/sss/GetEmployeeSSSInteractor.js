export default class GetEmployeeSSSInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEmployeeSSS(this.client.getToken())
  }
}
