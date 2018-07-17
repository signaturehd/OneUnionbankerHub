export default class UploadTransactionImageInteractor {
  constructor (client) {
      this.client = client
  }

  execute (transactionType, transactionId, file) {
    return this.client.uploadTransactionImageInteractor(this.client.getToken(), transactionType, file, transactionId)
  }
}
