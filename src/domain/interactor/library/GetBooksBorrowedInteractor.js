export default class GetBooksBorrowedInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBooksBorrowed(this.client.getToken())
  }
}
