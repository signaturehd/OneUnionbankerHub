export default class GetTransactionInteractor {
  constructor (client) {
      this.client = client
  }

  execute () {
    return this.client.getTransactions(this.client.getToken())
  }
}
