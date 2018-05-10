export default class PodcastViewedInteractor
{
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPodcastsViewed(this.client.getToken())
  }
}
