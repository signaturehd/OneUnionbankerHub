export default class GetTermAndRatesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (mplGetFormParam) {
    return this.client.getMplFormAttachments(this.client.getToken(), mplGetFormParam)
  }
}
