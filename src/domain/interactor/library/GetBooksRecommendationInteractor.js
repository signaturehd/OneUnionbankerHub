export default class GetBooksRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getBooksRecommendation(this.client.getToken())
  }
}
