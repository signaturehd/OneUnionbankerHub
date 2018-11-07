export default class AddBookFlightInteractor {
  constructor (client) {
    this.client = client
  }

  execute (bookParam) {
    return this.client.addBookFlight(this.client.getToken(), bookParam)
  }
}
