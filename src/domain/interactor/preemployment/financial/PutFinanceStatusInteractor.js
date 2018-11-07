export default class PutFinanceStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute (financialStatusParam) {
    return this.client.putFinancialStatus(this.client.getToken(), financialStatusParam)
  }
}
