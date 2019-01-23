export default class GetPensionFundsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPensionFunds(this.client.getToken())
  }
}
