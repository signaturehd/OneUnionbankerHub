export default class GetBooksBorrowedInteractor {
  constructor (client) {
    this.client = client
  }

  execute (borrowedPageNumber, find) {
    return this.client.getBooksBorrowed(this.client.getToken(), borrowedPageNumber, find)
  }
}
