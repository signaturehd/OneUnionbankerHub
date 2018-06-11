export default class GetBooksInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber, find) {
    return this.client.getBooks(this.client.getToken(), pageNumber, find)
  }
}
