export default class GetDevicesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getDevices(this.client.getToken())
  }
}
