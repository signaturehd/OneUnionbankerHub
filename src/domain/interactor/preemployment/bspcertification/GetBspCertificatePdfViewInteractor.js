export default class GetBspCertificatePdfViewInteractor {
  constructor (client) {
    this.client = client
  }

  execute (link) {
    return this.client.getOnBoardingDocument(this.client.getToken(), link)
  }
}
