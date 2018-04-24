export default class GetBooksInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBooks(this.client.getToken())
  }
}
