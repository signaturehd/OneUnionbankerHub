export default class GetRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber, find, isEditorsPick) {
    return this.client.getBooksRecommended(this.client.getToken(), pageNumber, find, isEditorsPick)
  }
}
