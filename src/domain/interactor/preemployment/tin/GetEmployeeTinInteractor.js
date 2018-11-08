export default class GetEmployeeTinInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEmployeeTin(this.client.getToken())
  }
}
