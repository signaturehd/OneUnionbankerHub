export default class AddPodcastRatingInteractor {
  constructor (client) {
    this.client = client
  }

  execute (PodcastParam) {
    return this.client.paddRating(this.client.getToken(), PodcastParam)
  }
}
