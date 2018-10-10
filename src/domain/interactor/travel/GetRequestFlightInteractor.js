export default class getRequestFlightInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getRequestFlightData(this.client.getToken())
  }
}
