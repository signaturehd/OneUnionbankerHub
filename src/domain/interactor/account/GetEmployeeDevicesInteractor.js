export default class GetEmployeeDevicesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEmployeeDevice(this.client.getToken())
  }
}
