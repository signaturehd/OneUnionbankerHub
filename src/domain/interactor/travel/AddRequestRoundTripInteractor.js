export default class AddRequestRoundTripInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requestParam) {
    return this.client.addRequestRoundTrip(this.client.getToken(), requestParam)
  }
}
