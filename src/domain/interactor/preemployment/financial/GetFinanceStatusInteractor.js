export default class GetFinanceStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getFinancialStatus(this.client.getToken())
  }
}
