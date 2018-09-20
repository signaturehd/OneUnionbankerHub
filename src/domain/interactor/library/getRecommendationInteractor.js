export default class GetRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pageNumber, find, isEditorsPick) {
    return this.client.getBooksRecommended(this.client.getToken(), pageNumber, find, isEditorsPick)
    .map(resp => {
      const respWithToken = { ...resp }
      respWithToken.token = this.client.getToken()

      return respWithToken
    })
  }
}
