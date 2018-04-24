export default class NewsInteractor
{
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getNews()
  }
}