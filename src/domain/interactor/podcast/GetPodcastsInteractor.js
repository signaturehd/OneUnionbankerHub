export default class GetPodcastsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPodcasts(this.client.getToken())
  }
}
