export default class GetTransactionByIdInteractor {
  constructor (client) {
    this.client = client
  }

  execute (GetTransactionParam) {
    return this.client.getTransactionById(this.client.getToken(), GetTransactionParam)
  }
}
