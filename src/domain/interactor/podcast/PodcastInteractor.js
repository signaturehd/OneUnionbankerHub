export default class PodcastInteractor
{
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getNews(this.client.getToken())
  }
}
