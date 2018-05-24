export default class AddBookRatingInteractor {
  constructor (client) {
    this.client = client
  }

  execute (BookParam) {
    return this.client.addRating(this.client.getToken(), BookParam)
  }
}
