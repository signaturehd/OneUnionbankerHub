export default class AddEmployeeTinInteractor {
  constructor (client) {
    this.client = client
  }

  execute (tin) {
    return this.client.addEmployeeTin(this.client.getToken(), tin)
  }
}
