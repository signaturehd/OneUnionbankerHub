export default class getRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getRecommendations(this.client.getToken())
  }
}
