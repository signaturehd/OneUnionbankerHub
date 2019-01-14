export default class GetPensionFundsDocumentsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPensionFundsDocuments(this.client.getToken())
  }
}
