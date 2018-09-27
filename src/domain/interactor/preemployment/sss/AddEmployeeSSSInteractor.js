export default class AddEmployeeSSSInteractor {
  constructor (client) {
    this.client = client
  }

  execute (employeeSSSParam) {
    return this.client.addEmployeeSSS(this.client.getToken(), employeeSSSParam)
  }
}
