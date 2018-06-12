export default class GetTermAndRatesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (mplGetFormParam) {
    return this.client.getMPLFormAttachments(this.client.getToken(), mplGetFormParam)
  }
}
