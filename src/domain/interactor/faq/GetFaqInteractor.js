export default class GetFaqInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getFaqs(this.client.getToken())
  }
}
