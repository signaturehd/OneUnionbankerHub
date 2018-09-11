export default class GetBooksCommentsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (itemId, page, items) {
    return this.client.getBooksComments(this.client.getToken(), itemId, page, items)
  }
}
