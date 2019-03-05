export default class GetFinanceDetailsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getFinancialDetails(this.client.getToken())
  }
}
