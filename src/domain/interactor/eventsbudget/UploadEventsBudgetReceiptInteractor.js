export default class UploadEventsBudgetReceiptInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id, attachments) {
    return this.client.uploadEventsBudgetReceipt(this.client.getToken(), id, attachments)
  }
}
