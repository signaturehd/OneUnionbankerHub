export default class GetTransactionApprovalInteractor {
  constructor (client) {
      this.client = client
  }

  execute () {
    return this.client.getTransactionsApproval(this.client.getToken())
  }
}
