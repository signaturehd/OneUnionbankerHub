export default class GetTransactionPersonalInteractor {
  constructor (client) {
      this.client = client
  }

  execute () {
    return this.client.getTransactionsPersonal(this.client.getToken())
  }
}
