export default class RemoveFinancialObligation {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.removeFinancial(this.client.getToken(), id)
  }
}
