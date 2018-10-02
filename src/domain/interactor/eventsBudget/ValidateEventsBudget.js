export default class ValidateEventsBudgetInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateEventsBudget(this.client.getToken())
  }
}
