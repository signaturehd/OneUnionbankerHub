export default class postBooksReservationInteractor {
  constructor (client) {
    this.client = client
  }

    execute (BookReserveParam) {
    return this.client.postBooksReservation(this.client.getToken(), BookReserveParam)
  }
}
