export default class AddFinanceStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute (financialStatusParam) {
    return this.client.addFinancialStatus(this.client.getToken(), financialStatusParam)
  }
}
