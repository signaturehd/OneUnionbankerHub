export default class PodcastRecommendationInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPodcastsRecommendations(this.client.getToken())
  }
}
