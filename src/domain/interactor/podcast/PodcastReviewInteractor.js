export default class PodcastReviewInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPodcastsReviews(this.client.getToken())
  }
}
