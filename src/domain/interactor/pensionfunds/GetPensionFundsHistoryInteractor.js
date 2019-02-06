export default class GetPensionFundsHistoryInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPensionFundsHistory(this.client.getToken())
  }
}
