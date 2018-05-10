export default class PodcastInteractor
{
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPodcasts(this.client.getToken())
  }
}
