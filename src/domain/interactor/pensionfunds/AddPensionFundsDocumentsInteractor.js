export default class AddPensionFundsDocumentsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.addPensionFundsDocuments(this.client.getToken())
  }
}
