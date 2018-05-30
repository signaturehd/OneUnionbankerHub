export default class GetTransactionDetailsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (GetTransactionParam) {
    return this.client.getTransactionsDetails(this.client.getToken(), GetTransactionParam)
  }
}
