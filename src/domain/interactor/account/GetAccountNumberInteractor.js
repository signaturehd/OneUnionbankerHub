export default class GetAccountNumberInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getAccountNumber()
  }
}
