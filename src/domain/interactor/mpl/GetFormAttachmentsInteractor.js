export default class GetTermAndRatesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMPLFormAttachments(this.client.getToken())
  }
}
