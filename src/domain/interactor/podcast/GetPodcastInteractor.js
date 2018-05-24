export default class GetPodcastInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getPodcast(this.client.getToken(), id)
  }
}
